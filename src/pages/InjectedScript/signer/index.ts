import { SignerPlugin } from "iotex-antenna/lib/action/method";
import { IAccount } from "iotex-antenna/lib/account/account";
import { Envelop } from "iotex-antenna/lib/action/envelop";

import { MessageClient } from "@/utils/message-client";
import {
  IOTEX_SIGNER_SIGN_MESSAGE,
  IOTEX_SIGNER_GET_ACCOUNT,
  IOTEX_SIGNER_GET_ACCOUNTS,
  IOTEX_SIGNER_SIGN_AND_SEND,
} from "@/constant/iotex";

export class ExtensionSignerPlugin
  extends MessageClient
  implements SignerPlugin {
  signAndSend(envelop: Envelop): Promise<string> {
    const params = Buffer.from(envelop.bytestream()).toString("hex");
    return this.send(IOTEX_SIGNER_SIGN_AND_SEND, params);
  }

  signMessage(data: string | Buffer | Uint8Array): Promise<Buffer> {
    return this.send(IOTEX_SIGNER_SIGN_MESSAGE, data);
  }

  getAccount(address: string): Promise<IAccount> {
    return this.send<string, IAccount>(IOTEX_SIGNER_GET_ACCOUNT, address);
  }

  getAccounts(): Promise<Array<IAccount>> {
    return this.send<string, IAccount[]>(IOTEX_SIGNER_GET_ACCOUNTS);
  }
}
