import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Button from "antd/lib/button";
import {
  ApiOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";
import Input from "antd/lib/input";
import { fonts } from "../../styles/style-font";
import { AccountItem } from "./AccountItem";
import { MenuItem } from "./MenuItem";

export const MyAccounts = () => {
  return (
    <>
      <Container>
        <FlexContainer>
          <MyAccountsText>My Accounts</MyAccountsText>

          <LockButtonContainer>
            <Button type={"default"} ghost block size={"small"}>
              Lock
            </Button>
          </LockButtonContainer>
        </FlexContainer>

        <HDivider />

        <SearchContainer>
          <SearchIcon />

          <div style={{ flexGrow: 1 }}>
            <SearchInput placeholder={"Search Accounts"} bordered={false} />
          </div>
        </SearchContainer>

        <HDivider />

        <AccountItem checked={true} />

        <AccountItem checked={false} />

        <HDivider />

        <MenuItem icon={() => <PlusIcon />} content={"Create Account"} />

        <MenuItem icon={() => <DownloadIcon />} content={"Import Account"} />

        <MenuItem
          icon={() => <ApiIcon />}
          content={"Connect Hardware Wallet"}
        />

        <HDivider />

        <MenuItem icon={() => <ExclamationIcon />} content={"Info & Help"} />

        <MenuItem icon={() => <SettingIcon />} content={"Settings"} />
      </Container>
    </>
  );
};

const Container = styled("div", {
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "4px",
});

const HDivider = styled("div", {
  backgroundColor: "rgba(255,255,255,0.3)",
  height: "1px",
});

const FlexContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const MyAccountsText = styled("div", ({ $theme }) => ({
  ...fonts.normal,
  color: $theme.colors.white,
  margin: $theme.sizing[2],
}));

const LockButtonContainer = styled("div", {
  width: "80px",
  margin: "10px",
});

const SearchContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: $theme.sizing[2],
  marginTop: $theme.sizing[1],
  marginRight: $theme.sizing[2],
  justifyContent: "space-between",
}));

const SearchIcon = styled(SearchOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[4],
}));

const SearchInput = styled(Input, ({ $theme }) => ({
  ...fonts.normal,
  color: $theme.colors.white,
}));

const PlusIcon = styled(PlusOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[3],
}));

const DownloadIcon = styled(DownloadOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[3],
}));

const ApiIcon = styled(ApiOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[3],
}));

const ExclamationIcon = styled(ExclamationCircleFilled, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[3],
}));

const SettingIcon = styled(SettingFilled, ({ $theme }) => ({
  color: $theme.colors.white,
  fontSize: $theme.sizing[3],
}));
