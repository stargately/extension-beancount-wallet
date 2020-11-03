// Encapsulation all type request
import { Client } from "./agent";
import { GET_STATE, SET_STATE, UPDATE_STATE } from "./store";
import {
  CREATE_PASSWORD,
  WALLET_UNLOCK,
  WALLET_LOCK,
  WALLET_INITIIATED,
  WALLET_LOCKED,
  WALLET_VERIFY_PASSWD,
  WALLET_GET_ACCOUNTS,
  WALLET_CREATE_ACCOUNT,
  WALLET_GET_ACCOUNT_META,
  WALLET_TRANSFER_TOKEN,
  WALLET_ACTIONS,
  WALLET_ACTION_DETAIL,
} from "./wallet";
import { LeanAccount, AccountMeta, Action } from "../wallet-core";

export default class DaemonClient {
  agent?: Client;

  init(port: chrome.runtime.Port) {
    this.agent = new Client(port);
  }

  private check() {
    if (this.agent) {
      return this.agent;
    }
    throw new Error("please invoke client init method before start");
  }

  async getAppState() {
    return this.check().sendRequest<Record<string, unknown>>(GET_STATE);
  }

  async setAppState(payload: any) {
    await this.check().sendRequest(SET_STATE, payload);
  }

  async updateAppState(payload: any) {
    await this.check().sendRequest(UPDATE_STATE, payload);
  }

  async createPassword(password: string, key?: string) {
    await this.check().sendRequest<void>(CREATE_PASSWORD, { password, key });
  }

  async walletUnlock(password: string) {
    await this.check().sendRequest(WALLET_UNLOCK, password);
  }

  async walletLock() {
    await this.check().sendRequest(WALLET_LOCK);
  }

  async walletLocked() {
    return this.check().sendRequest<boolean>(WALLET_LOCKED);
  }

  async walletInitiated() {
    return this.check().sendRequest<boolean>(WALLET_INITIIATED);
  }

  async walletVarifyPasswd(password: string) {
    return this.check().sendRequest<boolean>(WALLET_VERIFY_PASSWD, password);
  }

  async walletGetAccounts() {
    return this.check().sendRequest<LeanAccount[]>(WALLET_GET_ACCOUNTS);
  }

  async walletCreateAccount(name: string, privateKey?: string) {
    return this.check().sendRequest<string>(WALLET_CREATE_ACCOUNT, {
      name,
      privateKey,
    });
  }

  async walletGetAccountMeta(payload: {
    address: string;
    providerUrl: string;
  }) {
    const { accountMeta } = await this.check().sendRequest<{
      accountMeta: AccountMeta;
    }>(WALLET_GET_ACCOUNT_META, payload);
    return accountMeta;
  }

  async walletTransferToken(payload: {
    from: string;
    url: string;
    to: string;
    amount: string;
    gasPrice: string;
    gasLimit: string;
  }) {
    return this.check().sendRequest(WALLET_TRANSFER_TOKEN, payload);
  }

  async walletAccountActions(payload: {
    address: string;
    providerUrl: string;
    start: number;
    count: number;
  }) {
    const { actionInfo } = await this.check().sendRequest<{
      actionInfo: Action[];
    }>(WALLET_ACTIONS, payload);
    return actionInfo;
  }

  async walletAccountActionByHash(payload: {
    address: string;
    providerUrl: string;
    actionHash: string;
  }) {
    const { actionInfo } = await this.check().sendRequest<{
      actionInfo: Action[];
    }>(WALLET_ACTION_DETAIL, payload);
    return actionInfo;
  }
}

export const clientSingleton = new DaemonClient();
