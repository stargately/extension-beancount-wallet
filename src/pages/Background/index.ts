import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import localStore from "../../utils/localStore";
import daemon from "../../daemon";
import {
  walletSingleton,
  subscribleKeyringController,
} from "../../wallet-core";

extension.runtime.onInstalled.addListener(() => {
  console.log("App installed");
});

async function start() {
  const state = await localStore.get();
  if (state) {
    const vaultState = (state as Record<string, any>)[
      "Background.KeyringController.StoreState"
    ];
    walletSingleton.recoverKeyringController(vaultState);
    subscribleKeyringController(walletSingleton);
  }
  extension.runtime.onConnect.addListener((port) => {
    daemon.connect(port);
  });
}

start();
