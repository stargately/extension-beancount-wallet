import {
  IGetActionsByAddressRequest,
  IActionInfo,
  IAccountMeta,
} from "iotex-antenna/lib/rpc-method/types";
import { AntennaAccount } from "./antenna-account";
import { subscribleKeyringController } from "./utils";

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

export type CoinType = "IOTX";

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

  privateKey: string;
}

export class WalletCore {
  accounts: Array<IAccount>;

  keyringController: any;

  constructor() {
    this.accounts = [];
    this.keyringController;
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
    coinType: CoinType = "IOTX"
  ): string {
    if (coinType !== "IOTX") {
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

  createAccount(name: string, _ = "IOTX"): string {
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

  async recoverKeyringController(vault: string, opt?: any) {
    const keyringController = new KeyringController({
      initState: { vault },
      ...opt,
    });
    this.keyringController = keyringController;
  }

  async createKeyringController(password: string, opt?: any): Promise<void> {
    this.keyringController = new KeyringController(opt || {});
    subscribleKeyringController(this);
    await this.keyringController.createNewVaultAndKeychain(password);
    const addr = this.createAccount("IoTeX account 1");
    const acc = this.getAccount(addr);
    await this.keyringController.addNewKeyring(
      "Simple Key Pair",
      acc?.privateKey && [acc?.privateKey]
    );
  }

  get isInitiated(): boolean {
    return Boolean(this.keyringController);
  }

  get isLocked(): boolean {
    return !(
      this.keyringController &&
      this.keyringController.memStore.getState().isUnlocked
    );
  }

  get isUnLocked(): boolean {
    return (
      this.keyringController &&
      this.keyringController.memStore.getState().isUnlocked
    );
  }

  async verifyPassword(password: string): Promise<boolean> {
    try {
      // password incorrent will throw Error('Incorrect password')
      await this.keyringController.verifyPassword(password);
    } catch (e) {
      console.warn(e);
      return false;
    }
    return true;
  }

  async lock(): Promise<void> {
    await this.keyringController.setLocked();
  }

  async unlock(password: string): Promise<boolean> {
    const result = await this.keyringController.submitPassword(password);
    const keyrings = this.keyringController.keyrings.filter(
      (kr: any) => kr.type === "Simple Key Pair"
    );
    // if the number of Simple Key Pair Account is not equal to the number of iotex account, then all account will be clean and rebuild
    if (keyrings.length !== this.accounts.length) {
      this.accounts = [];
      keyrings.forEach(async (kr: any) => {
        const [privateKey] = await kr.serialize();
        // IoTeX accout name lost (TODO: Qiu)
        this.addAccount("IoTeX account 1", privateKey);
      });
    }
    return !!result;
  }
}

export const walletSingleton = new WalletCore();
