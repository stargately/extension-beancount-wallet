import { Daemon } from "./agent";
import storeHandlers from "./store";
import walletHandlers from "./wallet";
import { WalletCore, walletSingleton } from "../wallet-core";

const s = new Daemon();
s.registerHandlers(storeHandlers);
s.registerHandlers(walletHandlers);

class Lock {
  timer: NodeJS.Timeout;

  wallet: WalletCore;

  constructor(w: WalletCore) {
    this.wallet = w;
  }

  lock(ms: number) {
    this.timer = setTimeout(() => {
      this.wallet.lock();
    }, ms);
  }

  clear() {
    clearTimeout(this.timer);
  }
}

const lock = new Lock(walletSingleton);

s.on("connect", () => lock.clear());
s.on("disconnect", () => {
  if (s.ports.size === 0 && walletSingleton.isInitiated) {
    lock.lock(60 * 1000);
  }
});

export default s;
