import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import PortStream from "extension-port-stream";

import localStore from "../../utils/localStore";
import { walletSingleton } from "../../wallet-core";
import { MainController } from "./controller";

const KEYRING_VAULT = "Background_KeyringController_Vault";
const KEY_NAMES = "Background_KeyringController_KeyNames";
const mainController = new MainController();

extension.runtime.onInstalled.addListener(() => {
  console.log("Beancount Wallet installed");
});

async function start() {
  const state = ((await localStore.get()) as Record<string, any>) || {};
  // vault init
  const vaultState = state[KEYRING_VAULT];
  if (vaultState) {
    walletSingleton.keyringController.store.updateState({ vault: vaultState });
  }

  walletSingleton.keyringController.store.subscribe(async function () {
    const data = walletSingleton.keyringController.store.getState();
    if (data.vault) {
      await localStore.set({ [KEYRING_VAULT]: data.vault });
    }
  });

  const keynames = state[KEY_NAMES];
  if (keynames) {
    walletSingleton.keynames = keynames || {};
  }

  walletSingleton.on("UpdateKeyname", async function () {
    const { keynames } = walletSingleton;
    if (keynames) {
      await localStore.set({ [KEY_NAMES]: keynames });
    }
  });

  extension.runtime.onConnect.addListener((port) => {
    const stream = new PortStream(port);
    mainController.setupCommunication(stream);
  });
}

start();
