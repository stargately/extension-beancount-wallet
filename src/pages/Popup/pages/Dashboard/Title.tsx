import React, { useCallback } from "react";
import { styled } from "onefx/lib/styletron-react";
import { Dropdown, message, Typography, Menu } from "antd";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { defaultPostman } from "@/pages/Popup/postman";
import { networkCurrent, accountsList, accountAddress } from "@/recoil";

type AccountTitleProps = {
  account: {
    name: string;
    address: string;
  };
};

function FormatAddress({ title }: { title: string }) {
  return <>{`${title.slice(0, 6)}...${title.slice(-6)}`}</>;
}

export const Title: React.FC<AccountTitleProps> = ({ account }) => {
  const network = useRecoilValue(networkCurrent);
  const [accountItems, setAccountItems] = useRecoilState(accountsList);
  const setAddress = useSetRecoilState(accountAddress);

  const onIotexscan = useCallback(() => {
    window.open(`${network.iotexscan}/address/${account.address}`);
  }, [account.address, network.uri]);

  const onRemoveAccount = useCallback(async () => {
    if (accountItems.length <= 1) {
      message.info("You only have one account now");
      return;
    }
    await defaultPostman.removeAccount(account.address);
    const accounts = await defaultPostman.getAccounts();
    setAccountItems(accounts);
    setAddress(accounts[0].address);
  }, [accountItems.length, account.address]);

  const onClick = (e: any) => {
    switch (e.key) {
      default: {
        onIotexscan();
        break;
      }
      case "remove": {
        onRemoveAccount();
        break;
      }
    }
  };

  return (
    <Container>
      <Content>
        <Account>{account?.name}</Account>
        <AddressView>
          <Address title={account?.address}>
            <Typography.Text copyable={{ text: account?.address }}>
              <span>
                <FormatAddress title={account.address}></FormatAddress>
              </span>
            </Typography.Text>
          </Address>
        </AddressView>
      </Content>
      <ButtonContainer>
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <Menu onClick={onClick}>
              <Menu.Item key="view">View on IoTeXScan</Menu.Item>
              <Menu.Item key="remove">Remove Account</Menu.Item>
            </Menu>
          }
        >
          <DotButton>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
          </DotButton>
        </Dropdown>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled("div", {
  textAlign: "center",
  position: "relative",
});

const Content = styled("div", ({ $theme }) => ({
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  padding: "12px",
  borderBottom: `1px solid ${$theme.colors.black40}`,
}));

const Account = styled("div", {
  fontWeight: "bold",
});

const Address = styled("div", ({ $theme }) => ({
  color: $theme.colors.black60,
  width: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const AddressView = styled("div", () => ({
  display: "flex",
}));

const ButtonContainer = styled("div", {
  position: "absolute",
  right: "5px",
  top: "50%",
  transform: "translateY(-50%)",
});

const DotButton = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
  width: "10px",
  height: "100%",
  cursor: "pointer",
}));

const Dot = styled("div", ({ $theme }) => ({
  display: "flex",
  width: "3px",
  height: "3px",
  background: $theme.colors.black60,
  marginBottom: "3px",
}));
