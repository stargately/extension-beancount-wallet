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
} from "./wallet";

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

  async createPassword(password: string) {
    await this.check().sendRequest<void>(CREATE_PASSWORD, password);
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
}

export const clientSingleton = new DaemonClient();
