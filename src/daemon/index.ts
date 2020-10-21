import { Daemon } from "./agent";
import storeHandlers from "./store";
import walletHandlers from "./wallet";
import { getWalletSingleton } from "../wallet-core";

const s = new Daemon();
s.registerHandlers(storeHandlers);
s.registerHandlers(walletHandlers);

s.on("portDisconnect", (port: chrome.runtime.Port) => {
  // lock wallet if all port was disconnected
  if (
    port.name === "Popup" &&
    s.connectedPorts.size === 0 &&
    getWalletSingleton().isInitiated
  ) {
    getWalletSingleton().lock();
  }
});

export default s;
