import { JsonRpcEngine } from "json-rpc-engine";
import pump from "pump";
// @ts-ignore
import createEngineStream from "json-rpc-middleware-stream/engineStream";
import { IAccount } from "iotex-antenna/lib/account/account";
import { Envelop } from "iotex-antenna/lib/action/envelop";
import { setupMultiplex } from "../../utils/stream-utils";
import { walletSingleton } from "../../wallet-core";
import { MyMethod } from "./method";
import { AntennaAccount } from "../../wallet-core/antenna-account";

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
        const accounts = walletSingleton.accounts as AntennaAccount[];
        res.result = accounts.map((acc) => acc.antenna.iotx.accounts[0]);
        end();
        return;
      }
      next();
    });

    engine.push(function (req, res, next, end) {
      if (req.method === "Iotex_signAndSend") {
        const accounts = walletSingleton.accounts as AntennaAccount[];
        const method = new MyMethod(
          accounts[0].antenna.iotx,
          accounts[0].antenna.iotx.accounts[0]
        );
        const params = req.params as string;
        const buf = Uint8Array.from(Buffer.from(params, "hex"));
        const en = Envelop.deserialize(buf);
        method
          .sendAction(en)
          .then((result) => {
            res.result = result;
            end();
          })
          .catch((e) => {
            res.error = e;
            end();
          });
      } else {
        next();
      }
    });

    engine.push(function (req, res, next, end) {
      if (req.method === "Iotex_signMessage") {
        res.result = "Not implement";
        end();
      } else {
        next();
      }
    });

    engine.push<string, IAccount>(function (req, res, next, end) {
      if (req.method === "IoTex_getAccount") {
        const antennaAccount = walletSingleton.getAccount(
          req.params
        ) as AntennaAccount;
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
