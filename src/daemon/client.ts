// Encapsulation all type request
import { Client } from "./agent";
import { GET_STATE, SET_STATE } from "./store";
import {
  CREATE_PASSWORD,
  WALLET_UNLOCK,
  WALLET_LOCK,
  WALLET_INITIIATED,
  WALLET_LOCKED,
} from "./wallet";

export default class DaemonClient {
  agent: Client;

  constructor(public port: chrome.runtime.Port) {
    this.agent = new Client(port);
  }

  async getAppState() {
    await this.agent.sendRequest(GET_STATE);
  }

  async setAppState(payload: any) {
    await this.agent.sendRequest(SET_STATE, payload);
  }

  async createPassword(password: string) {
    await this.agent.sendRequest<void>(CREATE_PASSWORD, password);
  }

  async walletUnlock(password: string) {
    await this.agent.sendRequest(WALLET_UNLOCK, password);
  }

  async walletLock() {
    await this.agent.sendRequest(WALLET_LOCK);
  }

  async walletLocked() {
    return this.agent.sendRequest<boolean>(WALLET_LOCKED);
  }

  async walletInitiated() {
    return this.agent.sendRequest<boolean>(WALLET_INITIIATED);
  }
}

let _client: DaemonClient;

export function getSingleton(client?: DaemonClient): DaemonClient {
  if (_client) {
    return _client;
  }
  if (client) {
    _client = client;
  }
  return client!;
}
