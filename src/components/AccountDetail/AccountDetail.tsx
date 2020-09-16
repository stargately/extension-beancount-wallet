import React, { useEffect, useState } from "react";

import { useAccount, useNetwork } from "../../hooks";
import { walletSingleton } from "../../wallet-core";

export const AccountDetail = () => {
  const { address, account, setAddress, accounts } = useAccount();
  // TODO(tian): should remove but mock new account for now
  useEffect(() => {
    (async () => {
      await walletSingleton.createAccount("Mock acct 1");
      const acct = await walletSingleton.getAccount();
      const addr = await acct!.getAddress();
      setAddress(addr);
    })();
  }, [setAddress]);
  const [txHash, setTxHash] = useState("");
  const { current, availableNetworks, networkIndex } = useNetwork();
  return (
    <>
      <div>{address}</div>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
      <pre>
        now we are using the network {networkIndex} of{" "}
        {JSON.stringify(availableNetworks, null, 2)}
      </pre>
      <button
        onClick={async () => {
          account?.setProvider(current.uri);
          const txResult = await account?.transfer({
            to: String(address),
            amount: "1",
            gasPrice: "100000000000000000",
            gasLimit: "1000000",
          });
          setTxHash(txResult?.hash || "");
        }}
      >
        transfer
      </button>
      {txHash && <pre>{txHash}</pre>}
    </>
  );
};
