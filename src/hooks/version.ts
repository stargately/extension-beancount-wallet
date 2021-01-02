import recoil from "recoil";
import { walletVersion } from "../recoil";

export const useRefreshWallet = function () {
  return recoil.useRecoilCallback(
    ({ set }) => () => set(walletVersion, (ver) => ver + 1),
    []
  );
};
