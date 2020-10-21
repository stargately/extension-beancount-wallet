import recoil from "recoil";
import { getSingleton } from "../../daemon/client";

export const passwordState = recoil.atom({
  key: "App.Password",
  default: "",
});

export const accountState = recoil.atom({
  key: "App.Account",
  default: "",
});

export const networkState = recoil.atom<number>({
  key: "Network.State",
  default: 0,
});

export const walletKeyring = recoil.atom({
  key: "Wallet.Keyring",
  default: {
    isUnlocked: true,
  },
});

export const walletInitiated = recoil.atom({
  key: "Wallet.Initiated",
  default: false,
});

const AtomMap = {
  "App.Password": passwordState,
  "App.Account": accountState,
  "Network.State": networkState,
  isInitiated: walletInitiated,
  keyringMemState: walletKeyring,
} as { [propt: string]: recoil.RecoilState<any> };

// There is no api for searching atom by recoil 0.0.13
export function queryAtomByKey(key: string) {
  return AtomMap[key];
}
