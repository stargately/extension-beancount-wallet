import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import Tabs from "antd/lib/tabs";

import { AccountTitle } from "./AccountTitle";
import { Balance } from "./Balance";
import { CommonHeader } from "../CommonHeader";
import { CommonMargin } from "../../styles/common-margin";

import { useAccount, useNetwork } from "../../hooks";
import { walletSingleton } from "../../wallet-core";

const { TabPane } = Tabs;
export const AccountLayout = () => {
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
  const { current } = useNetwork();
  return (
    <>
      <CommonHeader />
      <AccountTitle account={accounts.find((acc) => acc.address === address)} />
      <CommonMargin />
      <Balance />
      <CommonMargin />
      <Button
        type="primary"
        htmlType="submit"
        size="large"
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
        Transfer
      </Button>
      <pre>{txHash}</pre>
      <CommonMargin />
      <Tabs
        type="card"
        style={{
          marginTop: "36px",
        }}
        centered={true}
        size="large"
      >
        <TabPane tab="Assets" key="1">
          Assets
        </TabPane>
        <TabPane tab="Activity" key="2">
          Activity
        </TabPane>
      </Tabs>
    </>
  );
};
