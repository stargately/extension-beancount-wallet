import React, { useCallback, useState } from "react";
import { styled } from "onefx/lib/styletron-react";
import { Dropdown, message, Typography, Menu, Modal } from "antd";
import { useRecoilValue, useRecoilState } from "recoil";

import { defaultPostman } from "@/pages/Popup/postman";
import {
  networkCurrent,
  accountsList,
  accountAddress,
  accountCurrent,
} from "@/recoil";

import { PasswordValidatorModal } from "@/pages/Popup/components/password-validator-modal";
import { AccountDetail } from "./components/AccountDetail";

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
  const [privatekeyModalVisible, setPrivatekeyModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const network = useRecoilValue(networkCurrent);
  const [accountItems, setAccountItems] = useRecoilState(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);
  const currentAccount = useRecoilValue(accountCurrent);

  const onIotexscan = useCallback(() => {
    window.open(`${network.iotexscan}/address/${account.address}`);
  }, [account.address, network.uri]);

  const onRemoveAccount = useCallback(async () => {
    if (accountItems.length <= 1) {
      message.info("You only have one account now");
      return;
    }
    setModalVisible(true);
  }, [accountItems.length, account.address]);

  const onNameChange = async (name: string) => {
    await defaultPostman.editAccount(address, name);
    const accounts = await defaultPostman.getAccounts();
    setAccountItems(accounts);
  };

  const onExport = () => {
    setAccountVisible(false);
    setPrivatekeyModalVisible(true);
  };

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
      case "detail": {
        setAccountVisible(true);
        break;
      }
    }
  };

  const onValidatePasswordForPrivateKey = async (password: string) => {
    const isOk = await defaultPostman.verifyPasswd(password);
    if (isOk) {
      setPrivatekeyModalVisible(false);
      defaultPostman.exportPrivateKey(address).then((privatekey) => {
        Modal.confirm({
          title: "Private Key",
          content: (
            <Typography.Paragraph copyable={{ text: privatekey }}>
              {privatekey}
            </Typography.Paragraph>
          ),
          icon: null,
        });
      });
    } else {
      message.error("The password that you entered is incorrect");
    }
  };

  const onValidatePassword = async (password: string) => {
    const isOk = await defaultPostman.verifyPasswd(password);
    if (isOk) {
      await defaultPostman.removeAccount(account.address);
      const accounts = await defaultPostman.getAccounts();
      setAccountItems(accounts);
      setAddress(accounts[0].address);
      setModalVisible(false);
      message.success("remove account success");
    } else {
      message.error("The password that you entered is incorrect");
    }
  };

  return (
    <Container>
      <AccountDetail
        visible={accountVisible}
        onExport={onExport}
        onNameChange={onNameChange}
        onView={onIotexscan}
        address={address}
        name={currentAccount.name}
        onCancel={() => setAccountVisible(false)}
      ></AccountDetail>
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
              <Menu.Item key="detail">Account Detail</Menu.Item>
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
      {modalVisible && (
        <PasswordValidatorModal
          visible={modalVisible}
          onOk={onValidatePassword}
          onCancel={() => setModalVisible(false)}
        ></PasswordValidatorModal>
      )}
      {privatekeyModalVisible && (
        <PasswordValidatorModal
          visible={privatekeyModalVisible}
          onOk={onValidatePasswordForPrivateKey}
          onCancel={() => setPrivatekeyModalVisible(false)}
        ></PasswordValidatorModal>
      )}
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
  padding: "10px",
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
