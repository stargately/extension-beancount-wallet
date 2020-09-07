import { AntennaAccount } from "./antenna-account";

export interface IProviderSource {
  name: string;
  uri: string;
}

export type LeanAccount = {
  name: string;
  address: string;
};

export interface IAccount {
  getProviders(): Array<IProviderSource>;

  setProvider(index: number): void;

  addProvider(source: IProviderSource): void;

  transfer(
    to: string,
    amount: string,
    gasPrice: string,
    gasLimit: string
  ): Promise<{ hash: string }>;

  estimateGas(): Promise<{ gasPrice: string; gasLimit: string }>;

  getAddress(): string;

  getName(): string;
}

class WalletCore {
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

  addAccount(name: string, privateKey: string, _ = "iotex"): string {
    const acc = new AntennaAccount(name, privateKey);
    const addr = acc.getAddress();
    this.accounts.push(acc);
    return addr;
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
