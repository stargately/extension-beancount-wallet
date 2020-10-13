import { Client, Server, ServerHandler } from "./agent";
import { ExtensionStore } from "../storage/local-store";

const T_GET_STATE = "T_GET_STATE";
const T_SET_STATE = "T_SET_STATE";

export class StoreClient {
  public client: Client;

  constructor(port: chrome.runtime.Port) {
    this.client = new Client(port);
  }

  getState() {
    return this.client.sendRequest(T_GET_STATE);
  }

  setState(state: any) {
    return this.client.sendRequest(T_SET_STATE, state);
  }
}

export class StoreServer {
  public server: Server;

  public store: ExtensionStore;

  constructor(port: chrome.runtime.Port) {
    this.server = new Server(port);
    this.store = new ExtensionStore();
    this.server.register(T_GET_STATE, this.getState);
    this.server.register(T_SET_STATE, this.setState);
  }

  getState: ServerHandler = (_, cb) => {
    this.store.get().then(cb).catch(cb);
  };

  setState: ServerHandler = (res, cb) => {
    const { payload } = res;
    this.store.set(payload);
    cb();
  };
}
