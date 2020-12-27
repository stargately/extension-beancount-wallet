import recoil from "recoil";
import { defaultPostman } from "@/pages/Popup/postman";

export const walletVersion = recoil.atom<number>({
  key: "Wallet.Version",
  default: 0,
});

export const walletInitiated = recoil.selector<boolean>({
  key: "Wallet.Initiated",
  get: async ({ get }) => {
    get(walletVersion);
    //  only calculate once?? how to fix (Qiu)
    return defaultPostman.walletInited();
  },
});

export const walletLocked = recoil.selector<boolean>({
  key: "Wallet.Locked",
  get: async ({ get }) => {
    get(walletVersion);
    //  only calculate once?? how to fix (Qiu)
    return defaultPostman.walletLocked();
  },
});
