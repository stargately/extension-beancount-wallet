import React from "react";
import Button from "antd/lib/button";
import Tabs from "antd/lib/tabs";
import { styled } from "onefx/lib/styletron-react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { AccountTitle } from "./AccountTitle";
import { Balance } from "./Balance";
import { CommonHeader } from "../CommonHeader";
import { accountCurrent } from "../../recoil";
import { ActionsHistory } from "../ActionsHistory";

const { TabPane } = Tabs;
export const AccountLayout = () => {
  const history = useHistory();
  const curAccount = useRecoilValue(accountCurrent);

  return (
    <Container>
      <CommonHeader />
      <AccountTitle account={curAccount} />
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
      <Tabs centered={true} size="large" tabBarStyle={{ width: "100%" }}>
        <TabPane
          tab="Assets"
          key="1"
          style={{ textAlign: "center", width: "100%" }}
        >
          Assets
        </TabPane>
        <TabPane
          tab="Activity"
          key="2"
          style={{ textAlign: "center", width: "100%" }}
        >
          <ActionsHistory></ActionsHistory>
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
