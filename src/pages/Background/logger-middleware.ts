import { JsonRpcMiddleware } from "json-rpc-engine";

export const loggerMiddleware: JsonRpcMiddleware<unknown, unknown> = (
  req,
  res,
  next,
  _
) => {
  next((cb) => {
    console.log("req", req);
    console.log("res", res);
    cb();
  });
};
