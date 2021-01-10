import recoil from "recoil";

import { LeanAccount, AccountMeta, Action } from "../wallet-core/wallet-core";

export const accountsList = recoil.atom<LeanAccount[]>({
  key: "App.Account.List",
  default: [],
});

export const accountAddress = recoil.atom<string>({
  key: "App.Account.Address",
  default: "",
});

export const accountCurrentMeta = recoil.atom<AccountMeta>({
  key: "App.Account.Meta",
  default: {
    address: "",
    balance: "",
    nonce: "",
    pendingNonce: "",
    numActions: "",
  },
});

export const accountActions = recoil.atom<Action[]>({
  key: "App.Account.Actions",
  default: [],
});

export const accountTokens = recoil.atom<any[]>({
  key: "App.Account.Tokens",
  default: [],
});

export const accountCurrent = recoil.selector<LeanAccount>({
  key: "App.Account.Current",
  get: ({ get }) => {
    const accounts = get(accountsList);
    const address = get(accountAddress);
    return accounts.filter((e) => e.address === address)[0];
  },
});
