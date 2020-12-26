import { JsonRpcEngine } from "json-rpc-engine";
import { createAntennaControllerMiddleware } from "./middlewares";

export function createControllerEngine() {
  const engine = new JsonRpcEngine();
  engine.push(createAntennaControllerMiddleware());
  return engine;
}
