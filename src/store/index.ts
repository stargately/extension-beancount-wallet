import { atom } from "recoil";

export interface IAccountInfo {
  type: string;
  address: string;
  privateKey: string;
  balance: string;
  //   TODO: other infos
}

// current account info
const accountState = atom<IAccountInfo | null>({
  key: "accountState",
  default: null,
});

export { accountState };
