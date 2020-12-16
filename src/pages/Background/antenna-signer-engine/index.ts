import { JsonRpcEngine } from "json-rpc-engine";
import { createAntennaSignerMiddleware } from "./middleware";

export function createSignerEngine() {
  const engine = new JsonRpcEngine();
  engine.push(createAntennaSignerMiddleware());
  return engine;
}
