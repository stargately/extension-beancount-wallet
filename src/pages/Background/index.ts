import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import localStore from "../../utils/localStore";
import daemon from "../../daemon";
import { getWalletSingleton } from "../../wallet-core";

console.log("This is the background page.");
console.log("Put the background scripts here.");
// eslint-disable-next-line no-undef
extension.runtime.onInstalled.addListener(() => {
  console.log("App installed");
});

extension.runtime.onConnect.addListener((port) => {
  daemon.connect(port);
});

const isDev = process.env.NODE_CONFIG_ENV === "dev";
if (isDev) {
  (global as any).getState = localStore.get.bind(localStore);
}

initialize();

async function initialize() {
  const initState = await loadStateFromPersistence();
  console.log("Last persist store:", initState);

  // wallet instance
  const walletinstance = getWalletSingleton(initState.keyringState || {});

  if (!initState.keyringMemState) {
    initState.isInitiated = walletinstance.isInitiated;
    initState.keyringMemState = walletinstance.keyringController.memStore.getState();
  }
  localStore.set(initState);

  // subscribe to store change
  walletinstance.keyringController.store.subscribe(updateKeyringStore);

  // subscribe to memstore change
  walletinstance.keyringController.memStore.subscribe(updateKeyringMemStore);
}

async function loadStateFromPersistence() {
  const data = (await localStore.get()) as any;
  return data || {};
}

async function updateKeyringStore(state: any) {
  console.log("update keyring store");
  const originData = (await localStore.get()) as any;
  const data = {
    ...originData,
    ...{
      keyringState: state,
    },
  };
  localStore.set(data);
}

async function updateKeyringMemStore(state: any) {
  console.log("update keyring mem store");
  const walletinstance = getWalletSingleton();
  const originData = (await localStore.get()) as any;
  const data = {
    ...originData,
    ...{
      isInitiated: walletinstance.isInitiated,
      keyringMemState: state,
    },
  };
  localStore.set(data);
}
