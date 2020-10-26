import React, { useCallback } from "react";
import { styled } from "onefx/lib/styletron-react";
import Button from "antd/lib/button";
import ApiOutlined from "@ant-design/icons/ApiOutlined";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import ExclamationCircleFilled from "@ant-design/icons/ExclamationCircleFilled";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import SettingFilled from "@ant-design/icons/SettingFilled";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import Input from "antd/lib/input";
import { useRecoilState } from "recoil";

import { fonts } from "../../styles/style-font";
import { AccountItem } from "./AccountItem";
import { MenuItem } from "./MenuItem";
import { accountsList, accountAddress } from "../../recoil";
import { clientSingleton } from "../../daemon/client";

export const MyAccounts = () => {
  const [accounts, setAccount] = useRecoilState(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);

  const handleCreateAccount = useCallback(async () => {
    await clientSingleton.walletCreateAccount(
      `IoTeX account ${accounts.length + 1}`
    );
    const _accounts = await clientSingleton.walletGetAccounts();
    setAccount(_accounts);
  }, []);

  return (
    <Container>
      <FlexContainer>
        <MyAccountsText>My Accounts</MyAccountsText>
        <LockButtonContainer>
          <Button type="default" ghost block size="small">
            Lock
          </Button>
        </LockButtonContainer>
      </FlexContainer>

      <HDivider />

      <SearchContainer>
        <SearchIcon />
        <div style={{ flexGrow: 1 }}>
          <SearchInput placeholder="Search Accounts" bordered={false} />
        </div>
      </SearchContainer>

      <HDivider />
      {/* Account List */}
      {accounts?.map((account) => (
        <AccountItem
          key={account.address}
          checked={address === account.address}
          account={account}
          onClick={() => {
            setAddress(account.address);
          }}
        />
      ))}
      {/* END Account List */}
      <HDivider />

      <MenuItem
        icon={() => <PlusIcon />}
        content="Create Account"
        onClick={handleCreateAccount}
      />

      <MenuItem icon={() => <DownloadIcon />} content="Import Account" />

      <MenuItem icon={() => <ApiIcon />} content="Connect Hardware Wallet" />

      <HDivider />

      <MenuItem icon={() => <ExclamationIcon />} content="Info & Help" />

      <MenuItem icon={() => <SettingIcon />} content="Settings" />
    </Container>
  );
};

const Container = styled("div", {
  backgroundColor: "rgba(0,0,0,0.8)",
  borderRadius: "4px",
  padding: "10px",
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
  paddingLeft: $theme.sizing[2],
  paddingRight: $theme.sizing[2],
  height: "45px",
  justifyContent: "space-between",
  alignContent: "center",
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
