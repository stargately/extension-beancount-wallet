import React, { useEffect, useRef, useCallback } from "react";
import { styled } from "onefx/lib/styletron-react";
import { Tooltip, Dropdown, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import ClipboardJS from "clipboard";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { clientSingleton } from "../../daemon/client";
import { networkCurrent, accountsList, accountAddress } from "../../recoil";

type AccountTitleProps = {
  account: {
    name: string;
    address: string;
  };
};

export const AccountTitle: React.FC<AccountTitleProps> = ({ account }) => {
  const buttonRef = useRef<HTMLSpanElement>(null);
  const network = useRecoilValue(networkCurrent);
  const [accountItems, setAccountItems] = useRecoilState(accountsList);
  const setAddress = useSetRecoilState(accountAddress);

  useEffect(() => {
    let clipboard: ClipboardJS;
    if (buttonRef.current) {
      clipboard = new ClipboardJS(buttonRef.current);
    }
    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, []);

  const onIotexscan = useCallback(() => {
    window.open(`${network.iotexscan}/address/${account.address}`);
  }, [account.address, network.uri]);

  const onRemoveAccount = useCallback(async () => {
    if (accountItems.length <= 1) {
      message.info("You only have one account now");
      return;
    }
    clientSingleton.walletRemoveAccount(account.address);
    const accounts = await clientSingleton.walletGetAccounts();
    setAccountItems(accounts);
    setAddress(accounts[0].address);
  }, [accountItems.length, account.address]);

  return (
    <Container>
      <Content>
        <Account>{account?.name}</Account>
        <AddressView>
          <Address title={account?.address}>
            <span>{account?.address} </span>
          </Address>
          <Tooltip title="Copied" trigger="click">
            <span ref={buttonRef} data-clipboard-text={account?.address}>
              <CopyButton />
            </span>
          </Tooltip>
        </AddressView>
      </Content>
      <ButtonContainer>
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <ExpandView>
              <Button onClick={onIotexscan}>View on Iotexscan</Button>
              <Button onClick={onRemoveAccount}>Remove Account</Button>
            </ExpandView>
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
  cursor: "pointer",
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

const CopyButton = styled(CopyOutlined, ({ $theme }) => ({
  color: $theme.colors.black80,
  marginLeft: $theme.sizing[0],
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

const ExpandView = styled("div", () => ({
  display: "flex",
  flexDirection: "column",
}));
