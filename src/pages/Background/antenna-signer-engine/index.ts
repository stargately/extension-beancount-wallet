import { JsonRpcEngine } from "json-rpc-engine";
import { createAntennaSignerMiddleware } from "./middlewares/signer";
import { createUnlockRequireMiddleware } from "./middlewares/unlock-required";

export function createSignerEngine() {
  const engine = new JsonRpcEngine();
  engine.push(createUnlockRequireMiddleware());
  engine.push(createAntennaSignerMiddleware());
  return engine;
}
