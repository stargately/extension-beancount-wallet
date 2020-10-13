import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import { ExtensionStore } from "../../storage/local-store";
import { StoreServer } from "../../client/store";

console.log("This is the background page.");
console.log("Put the background scripts here.");
// eslint-disable-next-line no-undef
extension.runtime.onInstalled.addListener(() => {
  console.log("App installed");
});

extension.runtime.onConnect.addListener((port) => {
  // eslint-disable-next-line
  new StoreServer(port);
});

const localStore = new ExtensionStore();
const isDev = process.env.NODE_CONFIG_ENV === "dev";
if (isDev) {
  (global as any).getState = localStore.get.bind(localStore);
}

async function initialize() {
  const initState = await localStore.get();
  console.log("initState", initState);
  console.debug("Beacount wallet initialization complete.");
}

initialize().catch(console.error);
