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
  (req: Request, cb: (res: Response) => void): void;
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
        res.isOk ? callbacks[0](res) : callbacks[1](res);
      }
    });
  }

  async sendRequest(type: string, payload: any) {
    return new Promise((resolve, reject) => {
      const req: Request = { uid: uuid(), type, payload };
      this.callbackQueen.set(req.uid, [resolve, reject]);
      this.port.postMessage(req);
    });
  }
}

export class Server {
  handlers: Map<string, ServerHandler> = new Map();

  constructor(public port: chrome.runtime.Port) {
    port.onMessage.addListener((req: Request) => this.dispatch(req));
  }

  register(type: string, handler: ServerHandler) {
    this.handlers.set(type, handler);
  }

  dispatch(req: Request) {
    const handler = this.handlers.get(req.type);
    handler?.call(this, req, this.sendResponse.bind(this));
  }

  sendResponse(res: Response) {
    this.port.postMessage(res);
  }
}
