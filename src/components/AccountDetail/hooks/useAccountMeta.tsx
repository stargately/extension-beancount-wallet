import { useEffect, useState } from "react";
import { IAccount } from "../../../wallet-core/wallet-core";

export const useAccountMeta = (
  account?: IAccount
): { balance: string; loading: boolean } => {
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const meta = await account?.getAccountMeta();
      setBalance(meta?.accountMeta?.balance || "0");
      setLoading(false);
    })();
  }, [account?.getAddress()]);
  return {
    balance,
    loading,
  };
};
