import { useEffect, useState } from "react";
import { useAccount } from "../../../hooks";
import { clientSingleton } from "../../../daemon/client";

export const useAccountMeta = (): { balance: string; loading: boolean } => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const meta = await clientSingleton.walletGetAccountMeta(address);
      setBalance(meta?.balance || "0");
      setLoading(false);
    })();
  }, [address]);
  return {
    balance,
    loading,
  };
};
