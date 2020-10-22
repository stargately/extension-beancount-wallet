import recoil from "recoil";
import { clientSingleton } from "../../daemon/client";

export const walletInitiated = recoil.selector<boolean>({
  key: "Wallet.Initiated",
  get: async () => {
    //  only calculate once?? how to fix (Qiu)
    return clientSingleton.walletInitiated();
  },
});

export const walletLocked = recoil.selector<boolean>({
  key: "Wallet.Locked",
  get: async () => {
    //  only calculate once?? how to fix (Qiu)
    return clientSingleton.walletLocked();
  },
});
