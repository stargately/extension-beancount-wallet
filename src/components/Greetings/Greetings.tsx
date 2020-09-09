import React, { useEffect } from "react";
import { useAccount } from "../../hooks/use-account";
import { walletSingleton } from "../../wallet-core";

export const Greetings: React.FC = () => {
  const { address, setAddress, accounts } = useAccount();
  // TODO(tian): should remove but mock new account for now
  useEffect(() => {
    (async () => {
      await walletSingleton.createAccount("Mock acct 1");
      const acct = await walletSingleton.getAccount();
      const addr = await acct!.getAddress();
      setAddress(addr);
    })();
  }, [setAddress]);
  return (
    <>
      <div>{address}</div>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </>
  );
};
