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
}

class WalletCore {
  accounts: Record<string, IAccount>;

  getAccount(address: string): IAccount {
    return this.accounts[address];
  }

  async addAccount(privateKey: string, _ = "iotex"): Promise<string> {
    const acc = new AntennaAccount(privateKey);
    const addr = await acc.getAddress();
    const normalizedAddr = `${acc.type}:${addr}`;
    this.accounts[normalizedAddr] = acc;
    return normalizedAddr;
  }

  async createAccount(_ = "iotex"): Promise<string> {
    const acc = new AntennaAccount();
    const addr = await acc.getAddress();
    const normalizedAddr = `${acc.type}:${addr}`;
    this.accounts[normalizedAddr] = acc;
    return normalizedAddr;
  }
}

export const walletSingleton = new WalletCore();
