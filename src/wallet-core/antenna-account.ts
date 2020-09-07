import crypto from "crypto";
import Antenna from "iotex-antenna";
import { IAccount, IProviderSource } from "./wallet-core";

const sources = [
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

  providers: Array<IProviderSource>;

  currentProvider = 0;

  privateKey: string;

  constructor(
    name: string,
    privateKey?: string,
    providers: Array<IProviderSource> = sources
  ) {
    this.name = name;
    this.type = "iotex";
    this.antenna = new Antenna(providers[this.currentProvider].uri);
    if (privateKey) {
      this.privateKey = privateKey;
      this.antenna.iotx.accounts.privateKeyToAccount(privateKey);
    } else {
      this.antenna.iotx.accounts.create(
        crypto.randomBytes(128).toString("hex")
      );
    }
  }

  addProvider(source: IProviderSource): void {
    this.providers.push(source);
  }

  getProviders(): Array<IProviderSource> {
    return this.providers;
  }

  setProvider(index: number): void {
    this.currentProvider = index;
    this.antenna.setProvider(this.providers[this.currentProvider].uri);
  }

  async transfer(
    to: string,
    amount: string,
    gasPrice: string,
    gasLimit: string
  ): Promise<{ hash: string }> {
    const hash = await this.antenna.iotx.sendTransfer({
      from: this.antenna.iotx.accounts[0].address,
      to,
      value: amount,
      gasLimit,
      gasPrice,
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
}
