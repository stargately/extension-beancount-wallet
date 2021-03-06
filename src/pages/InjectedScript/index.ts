import pump from "pump";
import { JsonRpcEngine } from "json-rpc-engine";
import { createStreamMiddleware } from "json-rpc-middleware-stream";

// @ts-ignore
import ObjectMultiplex from "obj-multiplex";
// @ts-ignore
import LocalMessageDuplexStream from "post-message-stream";
import { ExtensionSignerPlugin } from "./signer";

// setup background connection
const connectionStream = new LocalMessageDuplexStream({
  name: "inpage",
  target: "contentscript",
});

const mux = new ObjectMultiplex();
pump(connectionStream, mux, connectionStream, () => {
  console.log("signer lost connnection");
});

const jsonRpcConnection = createStreamMiddleware();
pump(
  jsonRpcConnection.stream,
  mux.createStream("signer"),
  jsonRpcConnection.stream,
  () => {
    console.log("signer lost connnection");
  }
);

const rpcEngine = new JsonRpcEngine();
rpcEngine.push(jsonRpcConnection.middleware);

const signer = new ExtensionSignerPlugin(rpcEngine);

(window as any).antennaSigner = signer;
