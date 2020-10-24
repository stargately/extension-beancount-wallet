import { useRecoilState } from "recoil";
import { useCallback } from "react";

import { clientSingleton } from "../daemon/client";
import { accountState, allAccountsState } from "../recoil/atom";

import { LeanAccount } from "../wallet-core/wallet-core";

type AccountState = {
  address: string;
  setAddress: (addr: string) => void;
  accounts: LeanAccount[];
  createAccount: (name?: string) => void;
  updateAccounts: () => void;
};

const useAccount = (): AccountState => {
  const [address, setAddress] = useRecoilState(accountState);
  const [accounts, setAccounts] = useRecoilState(allAccountsState);

  const updateAccounts = useCallback(() => {
    (async () => {
      try {
        const accs = await clientSingleton.walletGetAccounts();
        setAccounts(accs);
        // choose first account as current account by default
        if (!address) {
          setAddress(accs[0].address);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setAccounts, setAddress]);

  const createAccount = useCallback(
    (name?: string) => {
      (async () => {
        const defaultName = `IoTeX account ${accounts.length + 1}`;
        const addr = await clientSingleton.walletCreateAccount(
          name || defaultName
        );
        setAddress(addr);
        updateAccounts();
      })();
    },
    [setAddress, updateAccounts]
  );

  return {
    address,
    accounts,
    updateAccounts,
    createAccount,
    setAddress,
  };
};

export { useAccount };
