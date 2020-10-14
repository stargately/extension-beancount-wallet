let _uid = 0;

function uuid() {
  _uid += 1;
  return _uid;
}

export interface Request {
  uid: number;
  type: string;
  payload: any;
}

export interface Response {
  uid: number;
  payload?: any;
  type?: string;
  isOk: boolean;
}

export interface ServerHandler {
  (req: Request, cb: (res?: any) => void): void;
}

export interface HandlerGroup {
  [prop: string]: ServerHandler;
}

export class Client {
  public callbackQueen: Map<
    number,
    [(data?: any) => void, (data?: any) => void]
  > = new Map();

  constructor(public port: chrome.runtime.Port) {
    port.onMessage.addListener((res: Response) => {
      const { uid } = res;
      if (!this.callbackQueen.has(uid)) {
        return;
      }
      const callbacks = this.callbackQueen.get(uid);
      if (callbacks) {
        res.isOk ? callbacks[0](res.payload) : callbacks[1](res.payload);
      }
    });
  }

  async sendRequest(type: string, payload?: any) {
    return new Promise((resolve, reject) => {
      const req: Request = { uid: uuid(), type, payload };
      this.callbackQueen.set(req.uid, [resolve, reject]);
      this.port.postMessage(req);
    });
  }
}

export class Daemon {
  handlers: Map<string, ServerHandler> = new Map();

  connectedPorts: Set<chrome.runtime.Port> = new Set();

  connect(port: chrome.runtime.Port) {
    this.connectedPorts.add(port);
    port.onMessage.addListener((req: Request, p: chrome.runtime.Port) =>
      this.dispatch(req, p)
    );
    port.onDisconnect.addListener(() => {
      console.info(`Port ${port.name} is disconnected`);
      this.connectedPorts.delete(port);
    });
  }

  register(type: string, handler: ServerHandler) {
    this.handlers.set(type, handler);
  }

  registerHandlers(handlers: HandlerGroup) {
    const keys = Object.keys(handlers);
    keys.forEach((key) => {
      this.register(key, handlers[key]);
    });
  }

  dispatch(req: Request, port: chrome.runtime.Port) {
    if (this.connectedPorts.has(port)) {
      const handler = this.handlers.get(req.type);
      handler?.call(this, req, this.sendResponse.bind(this, port, req));
    }
  }

  sendResponse(port: chrome.runtime.Port, req: Request, res: any) {
    if (this.connectedPorts.has(port)) {
      const data: Response = {
        uid: req.uid,
        isOk: !(res instanceof Error),
        payload: res,
      };
      port.postMessage(data);
    }
  }
}
