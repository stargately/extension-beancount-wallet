import recoil from "recoil";

import { LeanAccount, AccountMeta } from "../wallet-core/wallet-core";
import { clientSingleton } from "../daemon/client";
import { networkCurrent } from "./network";

export const accountsList = recoil.atom<LeanAccount[]>({
  key: "App.Account.All",
  default: [],
});

export const accountAddress = recoil.atom<string>({
  key: "App.Account.Address",
  default: "",
});

export const accountCurrent = recoil.selector<LeanAccount>({
  key: "App.Account.Current",
  get: ({ get }) => {
    const accounts = get(accountsList);
    const address = get(accountAddress);
    return accounts.filter((e) => e.address === address)[0];
  },
});

export const accountVersion = recoil.atom<number>({
  key: "App.Account.Version",
  default: 0,
});

export const accountCurrentMeta = recoil.selector<AccountMeta>({
  key: "App.Account.Meta",
  get: async ({ get }) => {
    const current = get(accountCurrent);
    const network = get(networkCurrent);
    get(accountVersion);
    const accountMeta = await clientSingleton.walletGetAccountMeta({
      address: current.address,
      providerUrl: network.uri,
    });
    return accountMeta;
  },
});
