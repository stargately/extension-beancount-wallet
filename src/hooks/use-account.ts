import { atom, useRecoilState } from "recoil";
import { useCallback } from "react";
import {
  IAccount,
  LeanAccount,
  getWalletSingleton,
} from "../wallet-core/wallet-core";

// current account info
const addressState = atom<string | undefined>({
  key: "accountState",
  default: "",
});

type AccountState = {
  address?: string;
  accounts: Array<LeanAccount>;
  createAccount: (name: string) => void;
  setAddress: (addr: string) => void;
  account?: IAccount;
};

const useAccount = (): AccountState => {
  const [address, setAddress] = useRecoilState(addressState);

  const createAccount = useCallback(
    (name: string) => {
      (async () => {
        const addr = await getWalletSingleton().createAccount(name);
        setAddress(addr);
      })();
    },
    [setAddress]
  );

  const accounts = getWalletSingleton().getAccounts();

  return {
    address,
    accounts,
    account: getWalletSingleton().getAccount(address),
    createAccount,
    setAddress,
  };
};

export { useAccount };
