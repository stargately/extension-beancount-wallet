import { JsonRpcEngine } from "json-rpc-engine";
import pump from "pump";
// @ts-ignore
import createEngineStream from "json-rpc-middleware-stream/engineStream";
import { IAccount } from "iotex-antenna/lib/account/account";
import { setupMultiplex } from "../../utils/stream-utils";
import { walletSingleton } from "../../wallet-core";

export class MainController {
  createControllerEngine(): JsonRpcEngine {
    const engine = new JsonRpcEngine();
    engine.push(function (req, _, next, __) {
      console.log("background message logger ==> ", req);
      next();
    });
    engine.push(function (_, res, __, end) {
      res.result = "OK";
      end();
    });
    return engine;
  }

  createSignerEngine(): JsonRpcEngine {
    const engine = new JsonRpcEngine();
    engine.push<string, IAccount[]>(function (req, res, next, end) {
      if (req.method === "IoTex_getAccounts") {
        res.result = walletSingleton.accounts.map(
          (acc) => acc.antenna.iotx.accounts[0]
        );
        end();
        return;
      }
      next();
    });
    engine.push<string, IAccount>(function (req, res, next, end) {
      if (req.method === "IoTex_getAccount") {
        const antennaAccount = walletSingleton.getAccount(req.params);
        if (antennaAccount) {
          const [account] = antennaAccount.antenna.iotx.accounts;
          res.result = account;
          end();
          return;
        }
        res.error = new Error("can find account");
        end();
      }
      next();
    });
    return engine;
  }

  setupCommunication(outStrean: any) {
    const mux = setupMultiplex(outStrean);
    this.setupControllerConnection(mux.createStream("controller"));
    this.setupSignerConnection(mux.createStream("signer"));
  }

  setupSignerConnection(outStrean: any) {
    const engine = this.createSignerEngine();
    const providerStream = createEngineStream({ engine });
    pump(outStrean, providerStream, outStrean, () => {
      console.log("extension stream disconnected");
    });
  }

  setupControllerConnection(outStrean: any) {
    const engine = this.createControllerEngine();
    const providerStream = createEngineStream({ engine });
    pump(outStrean, providerStream, outStrean, () => {
      console.log("extension stream disconnected");
    });
  }
}
