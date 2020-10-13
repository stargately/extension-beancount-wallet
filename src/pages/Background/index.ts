import { ExtensionStore } from "../../storage/local-store";

console.log("This is the background page.");
console.log("Put the background scripts here.");
// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log("App installed");
});

// chrome.runtime.onConnect.addListener((port) => {});

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
