import crypto from "crypto";
import Antenna from "iotex-antenna";
import { toRau } from "iotex-antenna/lib/account/utils";
import { iotexNetworks, INetworkItem } from "../config/networks";
import {
  CoinType,
  IAccount,
  IGetActionsRequest,
  Action,
  AccountMeta,
} from "./wallet-core";

export class AntennaAccount implements IAccount {
  type: string;

  name: string;

  antenna: Antenna;

  privateKey: string;

  constructor(
    name: string,
    privateKey?: string,
    providers: Array<INetworkItem> = iotexNetworks
  ) {
    this.name = name;
    this.type = "IOTX";
    this.antenna = new Antenna(providers[0].uri);
    if (privateKey) {
      this.privateKey = privateKey;
      this.antenna.iotx.accounts.privateKeyToAccount(privateKey);
    } else {
      const acc = this.antenna.iotx.accounts.create(
        crypto.randomBytes(128).toString("hex")
      );
      this.privateKey = acc.privateKey;
    }
  }

  setProvider(uri: string): void {
    this.antenna.setProvider(uri);
  }

  async transfer(opts: {
    from: string;
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }): Promise<{ hash: string }> {
    const hash = await this.antenna.iotx.sendTransfer({
      from: opts.from,
      to: opts.to,
      value: toRau(opts.amount, "iotex"),
      gasLimit: `${opts.gasLimit}`,
      gasPrice: `${opts.gasPrice}`,
    });
    return { hash };
  }

  async estimateGas(): Promise<{ gasPrice: string; gasLimit: string }> {
    return Promise.resolve({
      gasPrice: "0",
      gasLimit: "0",
    });
  }

  getAddress(): string {
    return this.antenna.iotx.accounts[0].address;
  }

  getName(): string {
    return this.name;
  }

  getCoinType(): CoinType {
    return "IOTX";
  }

  getActions(start = 0, count = 10): Promise<{ actionInfo: Action[] }> {
    const req: IGetActionsRequest = {
      byAddr: {
        address: this.antenna.iotx.accounts[0].address,
        start,
        count,
      },
    };
    return this.antenna.iotx.getActions(req);
  }

  getActionByHash(actionHash: string) {
    const req: IGetActionsRequest = {
      byHash: {
        actionHash,
        checkingPending: true,
      },
    };
    return this.antenna.iotx.getActions(req);
  }

  getAccountMeta(): Promise<{ accountMeta: AccountMeta | undefined }> {
    return this.antenna.iotx.getAccount({
      address: this.antenna.iotx.accounts[0].address,
    });
  }
}
