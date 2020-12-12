import { SignerPlugin } from "iotex-antenna/lib/action/method";
import { IAccount } from "iotex-antenna/lib/account/account";
import { JsonRpcEngine } from "json-rpc-engine";
import { Envelop } from "iotex-antenna/lib/action/envelop";

import getUniqueId from "../../../utils/getUniqueId";

export class ExtensionSignerPlugin implements SignerPlugin {
  private rpcClient: JsonRpcEngine;

  constructor(rpcClient: JsonRpcEngine) {
    this.rpcClient = rpcClient;
  }

  signAndSend(envelop: Envelop): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rpcClient.handle(
        {
          id: getUniqueId(),
          method: "Iotex_signAndSend",
          jsonrpc: "2.0",
          params: Buffer.from(envelop.bytestream()).toString("hex"),
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

  signMessage(data: string | Buffer | Uint8Array): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.rpcClient.handle(
        {
          id: getUniqueId(),
          method: "Iotex_signMessage",
          jsonrpc: "2.0",
          params: data,
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
