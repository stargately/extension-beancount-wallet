import { JsonRpcEngine } from "json-rpc-engine";
import getUniqueId from "@/utils/getUniqueId";

export class MessageClient {
  private rpcClient?: JsonRpcEngine;

  constructor(rpcClient?: JsonRpcEngine) {
    this.rpcClient = rpcClient;
  }

  init(rpcClient: JsonRpcEngine) {
    this.rpcClient = rpcClient;
  }

  send<T, U>(method: string, params?: T): Promise<U> {
    if (!this.rpcClient) {
      throw new Error("No JsonRpcClient Prepared");
    }
    return new Promise((resolve, reject) => {
      this.rpcClient!.handle(
        {
          id: getUniqueId(),
          method,
          jsonrpc: "2.0",
          params,
        },
        (err, res: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.result);
        }
      );
    });
  }
}
