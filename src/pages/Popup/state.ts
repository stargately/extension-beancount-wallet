import recoil, { MutableSnapshot } from "recoil";
import { getSingleton } from "../../daemon/client";

export const timestampState = recoil.atom({
  key: "App.Timestamp",
  default: Date.now(),
});

export const passwordState = recoil.atom({
  key: "App.Password",
  default: "",
});

export const accountState = recoil.atom({
  key: "App.Account",
  default: "",
});

export const walletInitiated = recoil.selector<boolean>({
  key: "Wallet.Initiated",
  get: async () => {
    //  only calculate once?? how to fix (Qiu)
    return getSingleton().walletInitiated();
  },
});

export const walletLocked = recoil.selector<boolean>({
  key: "Wallet.Locked",
  get: async () => {
    //  only calculate once?? how to fix (Qiu)
    return getSingleton().walletLocked();
  },
});

export const StateObserver = () => {
  recoil.useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    console.log(snapshot);
  });
  return null;
};

export const initializeState: (
  mutableSnapshot: MutableSnapshot
) => void = () => {
  console.log("TOOD (Qiu)");
};
