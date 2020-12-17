import { JsonRpcEngine } from "json-rpc-engine";
import pump from "pump";
// @ts-ignore
import createEngineStream from "json-rpc-middleware-stream/engineStream";
import { setupMultiplex } from "../../utils/stream-utils";
import { createSignerEngine } from "./antenna-signer-engine";

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
    return createSignerEngine();
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
