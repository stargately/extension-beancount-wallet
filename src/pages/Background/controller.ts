import { JsonRpcEngine } from "json-rpc-engine";
import pump from "pump";
import { createEngineStream } from "json-rpc-middleware-stream";
import { Duplex } from "stream";
import { setupMultiplex } from "../../utils/stream-utils";
import { createSignerEngine } from "./antenna-signer-engine";
import { createControllerEngine } from "./antenna-controller-engine";

export class MainController {
  createControllerEngine(): JsonRpcEngine {
    return createControllerEngine();
  }

  createSignerEngine(): JsonRpcEngine {
    return createSignerEngine();
  }

  setupCommunication(outStrean: Duplex) {
    const mux = setupMultiplex(outStrean);
    this.setupControllerConnection(mux.createStream("controller"));
    this.setupSignerConnection(mux.createStream("signer"));
  }

  setupSignerConnection(outStrean: Duplex) {
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
