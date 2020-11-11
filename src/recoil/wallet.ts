import recoil from "recoil";
import { clientSingleton } from "../daemon/client";

export const walletVersion = recoil.atom<number>({
  key: "Wallet.Version",
  default: 0,
});

export const walletInitiated = recoil.selector<boolean>({
  key: "Wallet.Initiated",
  get: async ({ get }) => {
    get(walletVersion);
    //  only calculate once?? how to fix (Qiu)
    return clientSingleton.walletInitiated();
  },
});

export const walletLocked = recoil.selector<boolean>({
  key: "Wallet.Locked",
  get: async ({ get }) => {
    get(walletVersion);
    //  only calculate once?? how to fix (Qiu)
    return clientSingleton.walletLocked();
  },
});
