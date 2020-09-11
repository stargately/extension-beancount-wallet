import crypto from "crypto";
import Antenna from "iotex-antenna";
import { CoinType, IAccount, IProviderSource } from "./wallet-core";

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
    this.type = "iotex";
    this.antenna = new Antenna(providers[0].uri);
    if (privateKey) {
      this.privateKey = privateKey;
      this.antenna.iotx.accounts.privateKeyToAccount(privateKey);
    } else {
      this.antenna.iotx.accounts.create(
        crypto.randomBytes(128).toString("hex")
      );
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
    return "iotex";
  }
}
