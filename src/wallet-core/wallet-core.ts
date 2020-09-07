import { AntennaAccount } from "./antenna-account";

export interface IProviderSource {
  name: string;
  uri: string;
}

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
}

class WalletCore {
  accounts: Record<string, IAccount>;

  constructor() {
    this.accounts = {};
  }

  getAccount(address?: string): IAccount {
    if (!address) {
      return this.accounts[Object.keys(this.accounts)[0]];
    }
    return this.accounts[address];
  }

  async addAccount(privateKey: string, _ = "iotex"): Promise<string> {
    const acc = new AntennaAccount(privateKey);
    const addr = await acc.getAddress();
    this.accounts[addr] = acc;
    return addr;
  }

  async createAccount(_ = "iotex"): Promise<string> {
    const acc = new AntennaAccount();
    const addr = await acc.getAddress();
    this.accounts[addr] = acc;
    return addr;
  }
}

export const walletSingleton = new WalletCore();
