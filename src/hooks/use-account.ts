import { atom, useRecoilState } from "recoil";
import { useCallback } from "react";
import { LeanAccount, walletSingleton } from "../wallet-core/wallet-core";

// current account info
const addressState = atom<string | null>({
  key: "accountState",
  default: "",
});

type AccountState = {
  address: string | null;
  accounts: Array<LeanAccount>;
  createAccount: (name: string) => void;
  setAddress: (addr: string) => void;
};

const useAccount = (): AccountState => {
  const [address, setAddress] = useRecoilState(addressState);

  const createAccount = useCallback(
    (name: string) => {
      (async () => {
        const addr = await walletSingleton.createAccount(name);
        setAddress(addr);
      })();
    },
    [setAddress]
  );

  const accounts = walletSingleton.getAccounts();

  return {
    address,
    accounts,
    createAccount,
    setAddress,
  };
};

export { useAccount };
