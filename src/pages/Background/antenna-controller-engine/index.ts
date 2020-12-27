import { JsonRpcEngine } from "json-rpc-engine";
import { createAntennaControllerMiddleware } from "./middlewares";
import { loggerMiddleware } from "../logger-middleware";

export function createControllerEngine() {
  const engine = new JsonRpcEngine();

  if (process.env.NODE_ENV !== "production") {
    engine.push(loggerMiddleware);
  }

  engine.push(createAntennaControllerMiddleware());
  return engine;
}
