import recoil from "recoil";
import { accountVersion, walletVersion } from "../recoil";

export const useRefreshAccount = function () {
  return recoil.useRecoilCallback(
    ({ set }) => () => set(accountVersion, (ver) => ver + 1),
    []
  );
};

export const useRefreshWallet = function () {
  return recoil.useRecoilCallback(
    ({ set }) => () => set(walletVersion, (ver) => ver + 1),
    []
  );
};
