import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import Tabs from "antd/lib/tabs";
import { styled } from "onefx/lib/styletron-react";

import { AccountTitle } from "./AccountTitle";
import { Balance } from "./Balance";
import { CommonHeader } from "../CommonHeader";

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
    <Container>
      <CommonHeader />
      <AccountTitle account={accounts.find((acc) => acc.address === address)} />
      <Balance />
      <ButtonGroups>
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
      </ButtonGroups>
      <Paragraph>{txHash}</Paragraph>
      <Tabs centered={true} size="large" tabBarStyle={{ width: "100%" }}>
        <TabPane
          tab="Assets"
          key="1"
          style={{ textAlign: "center", width: "50%" }}
        >
          Assets
        </TabPane>
        <TabPane
          tab="Activity"
          key="2"
          style={{ textAlign: "center", width: "50%" }}
        >
          Activity
        </TabPane>
      </Tabs>
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const ButtonGroups = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "100%",
});

const Paragraph = styled("div", {
  height: "40px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
