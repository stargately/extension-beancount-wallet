import recoil from "recoil";
import { accountVersion } from "../recoil";

export const useRefreshAccountMeta = function () {
  return recoil.useRecoilCallback(
    ({ set }) => () => set(accountVersion, (ver) => ver + 1),
    []
  );
};
