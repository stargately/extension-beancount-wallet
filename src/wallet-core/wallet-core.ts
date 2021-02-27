import {
  IGetActionsByAddressRequest,
  IGetActionsByHashRequest,
  IActionInfo,
  IAccountMeta,
} from "iotex-antenna/lib/rpc-method/types";
import { toRau } from "iotex-antenna/lib/account/utils";
import { XRC20 } from "iotex-antenna/lib/token/xrc20";
import { BigNumber } from "bignumber.js";
import SafeEventEmitter from "@metamask/safe-event-emitter";

import { AntennaAccount } from "./antenna-account";

const KeyringController = require("eth-keyring-controller");

export type LeanAccount = {
  name: string;
  address: string;
};

export type Action = IActionInfo;

export type AccountMeta = IAccountMeta;

export type CoinType = "IOTX";

export type IGetActionsRequest = {
  byAddr?: IGetActionsByAddressRequest;
  byHash?: IGetActionsByHashRequest;
};

export interface IAccount {
  setProvider(uri: string): void;

  transfer(opts: {
    from: string;
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }): Promise<{ hash: string }>;

  estimateGas(): Promise<{ gasPrice: string; gasLimit: string }>;

  getAddress(): string;

  getName(): string;

  getCoinType(): CoinType;

  getActions(start: number, count: number): Promise<{ actionInfo: Action[] }>;

  getActionByHash(actionHash: string): Promise<{ actionInfo: Action[] }>;

  getAccountMeta(): Promise<{ accountMeta: AccountMeta | undefined }>;

  name: string;
  privateKey: string;
}

export class WalletCore extends SafeEventEmitter {
  accounts: Array<IAccount>;

  keyringController: any;

  password: string;

  keynames: Record<string, string> = {};

  constructor(opt?: any) {
    super();
    this.accounts = [];
    this.keyringController = new KeyringController(opt || {});
  }

  exportPrivateKey(address: string) {
    const acc = this.accounts.find((acc) => acc.getAddress() === address);
    if (!acc) {
      throw new Error(
        "Unable to find the account associated with this address"
      );
    }
    return acc.privateKey;
  }

  getAccount(address?: string): IAccount | undefined {
    if (!address) {
      return this.accounts[0];
    }
    return this.accounts.find((acc) => acc.getAddress() === address);
  }

  addAccount(
    name: string,
    privateKey?: string,
    coinType: CoinType = "IOTX"
  ): IAccount {
    if (coinType !== "IOTX") {
      throw new Error(`unimplemented coin type ${coinType}`);
    }
    const acc = new AntennaAccount(name, privateKey);
    this.keynames[acc.privateKey] = name;
    this.emit("UpdateKeyname");
    this.accounts.push(acc);
    return acc;
  }

  editAccount(address: string, name: string) {
    const acc = this.getAccount(address);
    if (acc) {
      acc.name = name;
      this.keynames[acc.privateKey] = name;
      this.emit("UpdateKeyname");
    }
  }

  removeAccount(address: string): void {
    const idx = this.accounts.findIndex((acc) => acc.getAddress() === address);
    this.accounts.splice(idx, 1);
  }

  async deleteAccount(address: string): Promise<void> {
    const accounts = this.getAccounts();
    const i = accounts.findIndex((acc) => acc.address === address);
    if (i === -1) {
      return;
    }
    this.keyringController.keyrings.splice(i + 1, 1);
    this.removeAccount(address);
    await this.keyringController.persistAllKeyrings(this.password);
  }

  async createAccount(
    name: string,
    privateKey?: string,
    coinType: CoinType = "IOTX"
  ): Promise<string> {
    const acc = this.addAccount(name, privateKey, coinType);
    if (!acc.privateKey) {
      throw new Error("private key lost");
    }
    await this.keyringController.addNewKeyring(
      "Simple Key Pair",
      acc.privateKey && [acc.privateKey]
    );
    return acc.getAddress();
  }

  getAccounts(): Array<LeanAccount> {
    return this.accounts.map((acc) => ({
      address: acc.getAddress(),
      name: acc.getName(),
    }));
  }

  getActions(
    address?: string,
    start = 0,
    count = 10
  ): Promise<{ actionInfo: Action[] } | undefined> {
    const acc = this.getAccount(address);
    return Promise.resolve(acc?.getActions(start, count));
  }

  getActionsByHash(
    address: string,
    actionHash: string
  ): Promise<{ actionInfo: Action[] } | undefined> {
    const acc = this.getAccount(address);
    return Promise.resolve(acc?.getActionByHash(actionHash));
  }

  getAccountMeta(
    address?: string
  ): Promise<{ accountMeta: AccountMeta | undefined } | undefined> {
    const acc = this.getAccount(address);
    return Promise.resolve(acc?.getAccountMeta());
  }

  async createKeyringController(
    password: string,
    privateKey?: string
  ): Promise<void> {
    await this.keyringController.createNewVaultAndKeychain(password);
    await this.createAccount("Defaut Account", privateKey);
    this.password = password;
  }

  get isInitiated(): boolean {
    return !!this.keyringController.store.getState().vault;
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

    const waitings = [];
    // if the number of Simple Key Pair Account is not equal to the number of iotex account, then all accounts will be destoryed and rebuild
    if (this.accounts.length < keyrings.length) {
      this.accounts = [];
      for (let i = 0; i < keyrings.length; i += 1) {
        const kr = keyrings[i];
        waitings.push(kr.serialize());
      }
    }

    const rows = await Promise.all(waitings);
    rows.forEach(([privateKey], i) => {
      this.addAccount(
        this.keynames[privateKey] || `IoTeX account ${i}`,
        privateKey
      );
    });
    this.password = password;
    return !!result;
  }

  async xrc20List(payload: {
    address: string;
    providerUrl: string;
    xrc20: { name: string; url: string }[];
  }) {
    const acc = this.getAccount(payload.address) as AntennaAccount;
    if (!acc) {
      throw new Error("can find out account");
    }
    acc.setProvider(payload.providerUrl);
    const result: {
      name: string;
      balance: any;
      symbol: string;
      decimals: any;
    }[] = [];
    const tokens = payload.xrc20.map(
      (e) => new XRC20(e.url, { provider: acc.antenna.iotx })
    );

    try {
      /* eslint no-await-in-loop: 0 */
      for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];
        const { name } = payload.xrc20[i];
        // const name = await token.name();
        const symbol = await token.symbol();
        const balance = await token.balanceOf(payload.address);
        const decimals = await token.decimals();
        result.push({ name, balance, symbol, decimals });
      }
    } catch (e) {
      console.warn(e);
    }

    return result;
  }

  async xrc20Transfer(payload: {
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gasLimit: string;
    providerUrl: string;
    xrc20Address: string;
  }) {
    const acc = this.getAccount(payload.from) as AntennaAccount;
    if (!acc) {
      throw new Error("can find out account");
    }
    acc.setProvider(payload.providerUrl);
    const token = new XRC20(payload.xrc20Address, {
      provider: acc.antenna.iotx,
    });
    await token.transfer(
      payload.to,
      new BigNumber(toRau(payload.value, "IOTX"), 10),
      {
        account: acc.antenna.iotx.accounts[0],
        gasPrice: `${payload.gasPrice}`,
        gasLimit: `${payload.gasLimit}`,
      }
    );
  }

  // transfer token
  async transferToken(payload: {
    from: string;
    url: string;
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }) {
    const acc = this.getAccount(payload.from);
    if (payload.url && /^http/.test(payload.url)) {
      acc?.setProvider(payload.url);
    }
    await acc?.transfer({
      from: payload.from,
      to: payload.to,
      amount: payload.amount,
      gasLimit: payload.gasLimit,
      gasPrice: payload.gasPrice,
    });
  }
}

export const walletSingleton = new WalletCore();
