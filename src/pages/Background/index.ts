import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import PortStream from "extension-port-stream";

import localStore from "../../utils/localStore";
import { walletSingleton } from "../../wallet-core";
import { MainController } from "./controller";

const SUBSCRIBE_STORE_KEY = "Background_KeyringController_StoreVault";
const mainController = new MainController();

extension.runtime.onInstalled.addListener(() => {
  console.log("Beancount Wallet installed");
});

async function start() {
  const state = await localStore.get();
  const vaultState =
    state && (state as Record<string, any>)[SUBSCRIBE_STORE_KEY];

  if (vaultState) {
    walletSingleton.keyringController.store.updateState({ vault: vaultState });
  }

  walletSingleton.keyringController.store.subscribe(async function () {
    const data = walletSingleton.keyringController.store.getState();
    if (data.vault) {
      await localStore.set({ [SUBSCRIBE_STORE_KEY]: data.vault });
    }
  });

  extension.runtime.onConnect.addListener((port) => {
    const stream = new PortStream(port);
    mainController.setupCommunication(stream);
  });
}

start();
