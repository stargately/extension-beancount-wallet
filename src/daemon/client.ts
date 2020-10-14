// Encapsulation all type request
import { Client } from "./agent";
import { GET_STATE, SET_STATE } from "./store";
import { CREATE_PASSWORD, WALLET_UNLOCK } from "./wallet";

export default class ClientAgent {
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
    await this.agent.sendRequest(CREATE_PASSWORD, password);
  }

  async walletUnlock(password: string) {
    await this.agent.sendRequest(WALLET_UNLOCK, password);
  }
}
