import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import { IAccount, walletSingleton } from "../wallet-core/wallet-core";

// current account info
const addressState = atom<string | null>({
  key: "accountState",
  default: "",
});

const useAccount = (): [IAccount | null, (addr: string) => void] => {
  const [address, setAddress] = useRecoilState(addressState);

  // TODO(tian): should remove but mock new account for now
  useEffect(() => {
    (async () => {
      await walletSingleton.createAccount("yo");
      const acct = await walletSingleton.getAccount();
      const addr = await acct.getAddress();
      setAddress(addr);
    })();
  }, [setAddress]);

  if (!address) {
    return [null, setAddress];
  }

  return [walletSingleton.getAccount(address), setAddress];
};
export { useAccount };
