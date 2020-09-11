import { AntennaAccount } from "./antenna-account";

export interface IProviderSource {
  name: string;
  uri: string;
}

export type LeanAccount = {
  name: string;
  address: string;
};

export type CoinType = "iotex";

export interface IAccount {
  setProvider(uri: string): void;

  transfer(opts: {
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }): Promise<{ hash: string }>;

  estimateGas(): Promise<{ gasPrice: string; gasLimit: string }>;

  getAddress(): string;

  getName(): string;

  getCoinType(): CoinType;
}

export class WalletCore {
  accounts: Array<IAccount>;

  constructor() {
    this.accounts = [];
  }

  getAccount(address?: string): IAccount | undefined {
    if (!address) {
      return this.accounts[0];
    }
    return this.accounts.find((acc) => acc.getAddress() === address);
  }

  addAccount(
    name: string,
    privateKey: string,
    coinType: CoinType = "iotex"
  ): string {
    if (coinType !== "iotex") {
      throw new Error(`unimplemented coin type ${coinType}`);
    }
    const acc = new AntennaAccount(name, privateKey);
    const addr = acc.getAddress();
    this.accounts.push(acc);
    return addr;
  }

  removeAccount(address: string): void {
    const idx = this.accounts.findIndex((acc) => acc.getAddress() === address);
    this.accounts.splice(idx, 1);
  }

  createAccount(name: string, _ = "iotex"): string {
    const acc = new AntennaAccount(name);
    const addr = acc.getAddress();
    this.accounts.push(acc);
    return addr;
  }

  getAccounts(): Array<LeanAccount> {
    return this.accounts.map((acc) => ({
      address: acc.getAddress(),
      name: acc.getName(),
    }));
  }
}

export const walletSingleton = new WalletCore();
