import crypto from "crypto";
import Antenna from "iotex-antenna";
import {
  CoinType,
  IAccount,
  IProviderSource,
  IGetActionsRequest,
  Action,
  AccountMeta,
} from "./wallet-core";

export const iotexNetworks = [
  {
    name: "Main net",
    uri: "https://api.iotex.one",
  },
  {
    name: "Test net",
    uri: "https://api.testnet.iotex.one",
  },
];

export class AntennaAccount implements IAccount {
  type: string;

  name: string;

  antenna: Antenna;

  privateKey: string;

  constructor(
    name: string,
    privateKey?: string,
    providers: Array<IProviderSource> = iotexNetworks
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
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }): Promise<{ hash: string }> {
    const hash = await this.antenna.iotx.sendTransfer({
      from: this.antenna.iotx.accounts[0].address,
      to: opts.to,
      value: opts.amount,
      gasLimit: opts.gasLimit,
      gasPrice: opts.gasPrice,
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

  getActions(): Promise<{ actionInfo: Action[] }> {
    const req: IGetActionsRequest = {
      byAddr: {
        address: this.antenna.iotx.accounts[0].address,
        start: 0,
        count: 10,
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
