import React, { useState } from "react";
import Button from "antd/lib/button";
import Tabs from "antd/lib/tabs";
import { styled } from "onefx/lib/styletron-react";
import { useHistory } from "react-router-dom";

import { AccountTitle } from "./AccountTitle";
import { Balance } from "./Balance";
import { CommonHeader } from "../CommonHeader";

import { useAccount, useNetwork } from "../../hooks";

const { TabPane } = Tabs;
export const AccountLayout = () => {
  const { address, account, accounts } = useAccount();
  const history = useHistory();
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
          onClick={() => {
            history.push("/transfer");
          }}
        >
          Transfer
        </Button>
      </ButtonGroups>
      <Paragraph></Paragraph>
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
