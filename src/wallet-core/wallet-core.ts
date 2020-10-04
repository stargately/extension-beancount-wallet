import {
  IGetActionsByAddressRequest,
  IActionInfo,
  IAccountMeta,
} from "iotex-antenna/lib/rpc-method/types";
import { AntennaAccount } from "./antenna-account";

const KeyringController = require("eth-keyring-controller");

export interface IProviderSource {
  name: string;
  uri: string;
}

export type LeanAccount = {
  name: string;
  address: string;
};

// TODO(di): later remove, should define for different coin to implement
export type Action = IActionInfo;

// TODO(di): later remove, should define for different coin to implement
export type AccountMeta = IAccountMeta;

export type CoinType = "iotex";

// TODO(di): later remove, should define for different coin to implement
export type IGetActionsRequest = {
  byAddr?: IGetActionsByAddressRequest;
};

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

  getActions(): Promise<{ actionInfo: Action[] }>;

  getAccountMeta(): Promise<{ accountMeta: AccountMeta | undefined }>;
}

export class WalletCore {
  accounts: Array<IAccount>;

  keyringController: any;

  constructor() {
    this.accounts = [];
    this.keyringController = new KeyringController({});
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

  getActions(address?: string): Promise<{ actionInfo: Action[] } | undefined> {
    const acc = this.getAccount(address);
    return Promise.resolve(acc?.getActions());
  }

  getAccountMeta(
    address?: string
  ): Promise<{ accountMeta: AccountMeta | undefined } | undefined> {
    const acc = this.getAccount(address);
    return Promise.resolve(acc?.getAccountMeta());
  }

  async createKeyringController(password: string): Promise<void> {
    await this.keyringController.createNewVaultAndKeychain(password);
    const privateKey =
      "98ba3472fce96b0135e7ad7923a0c6f9ee8ec98a039529752a3a6e4d43bc802a";
    await this.keyringController.addNewKeyring("Simple Key Pair", [privateKey]);
    this.addAccount("Untitled acc name 1", privateKey, "iotex");
  }

  get isLocked(): boolean {
    return !this.keyringController.memStore.getState().isUnlocked;
  }

  get isUnLocked(): boolean {
    return this.keyringController.memStore.getState().isUnlocked;
  }

  async lock(): Promise<void> {
    await this.keyringController.setLocked();
  }

  async unlock(password: string): Promise<boolean> {
    return this.keyringController.submitPassword(password);
  }
}

export const walletSingleton = new WalletCore();
