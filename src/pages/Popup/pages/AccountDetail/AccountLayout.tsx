import React from "react";
import Button from "antd/lib/button";
import Tabs from "antd/lib/tabs";
import { styled } from "onefx/lib/styletron-react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import ScrollBar from "react-perfect-scrollbar";

import { accountCurrent, appTabActiveKey } from "@/recoil";
import { AccountTitle } from "./AccountTitle";
import { Balance } from "./Balance";
import { CommonHeader } from "../CommonHeader";
import { ActionsHistory } from "../ActionsHistory";

const { TabPane } = Tabs;
export const AccountLayout = () => {
  const history = useHistory();
  const curAccount = useRecoilValue(accountCurrent);
  const [tabActiveKey, setTabActiveKey] = useRecoilState(appTabActiveKey);

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
      <Tabs
        centered={true}
        size="large"
        activeKey={tabActiveKey}
        onTabClick={setTabActiveKey}
        tabBarStyle={{ width: "100%", flex: 1 }}
      >
        <TabPane
          tab="Assets"
          key="asset"
          style={{ textAlign: "center", width: "100%" }}
        >
          Assets
        </TabPane>
        <TabPane
          tab="Activity"
          key="activity"
          style={{ textAlign: "center", width: "100%", height: "100%" }}
        >
          <div style={{ height: "190px" }}>
            <ScrollBar>
              <ActionsHistory></ActionsHistory>
            </ScrollBar>
          </div>
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

const ButtonGroups = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexShrink: 0,
  marginBottom: $theme.sizing[3],
}));
