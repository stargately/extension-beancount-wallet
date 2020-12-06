// import { SignerPlugin } from "iotex-antenna/lib/action/method"
// import { IAccount } from "iotex-antenna/lib/account/account"
import { JsonRpcEngine } from "json-rpc-engine";
import getUniqueId from "../../../utils/getUniqueId";
import { IAccount } from "../../../wallet-core";

export class ExtensionSignerPlugin {
  private rpcClient: JsonRpcEngine;

  constructor(rpcClient: JsonRpcEngine) {
    this.rpcClient = rpcClient;
  }

  getAccount(address: string): Promise<IAccount> {
    return new Promise((resolve, reject) => {
      this.rpcClient.handle<string, IAccount>(
        {
          id: getUniqueId(),
          method: "IoTex_getAccount",
          params: address,
          jsonrpc: "2.0",
        },
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          // @ts-ignore
          resolve(res.result);
        }
      );
    });
  }

  getAccounts(): Promise<Array<IAccount>> {
    return new Promise((resolve, reject) => {
      this.rpcClient.handle<string, IAccount>(
        { id: getUniqueId(), method: "IoTex_getAccounts", jsonrpc: "2.0" },
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          // @ts-ignore
          resolve(res.result);
        }
      );
    });
  }
}
