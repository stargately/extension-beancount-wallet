import { WalletCore } from "./wallet-core";
import localStore from "../utils/localStore";

export function subscribleKeyringController(w: WalletCore) {
  w.keyringController &&
    w.keyringController.store.subscribe(async function () {
      const state = w.keyringController.store.getState();
      if (state.vault) {
        await localStore.set({
          "Background.KeyringController.StoreState": state.vault,
        });
      }
    });
}
