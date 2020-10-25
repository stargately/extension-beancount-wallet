import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { CheckOutlined } from "@ant-design/icons";
import { fonts } from "../../styles/style-font";
import { LeanAccount } from "../../wallet-core";

interface AccountItemProps {
  checked: boolean;
  account: LeanAccount;
  onClick?: () => void;
}

export const AccountItem = (props: AccountItemProps) => {
  const { account, checked, onClick } = props;
  return (
    <ItemContainer>
      <TopContentContainer
        onClick={() => {
          !checked && onClick && onClick();
        }}
      >
        <CheckIcon
          style={{
            visibility: checked ? "visible" : "hidden",
          }}
        />

        <CircleAvatar src={require("../../assets/img/logo.png")} />

        <AccountNameText>{account.name}</AccountNameText>
      </TopContentContainer>
      {/* TODO (Di): later add banlance in account list */}
      <BalanceText>TODO</BalanceText>
    </ItemContainer>
  );
};

const ItemContainer = styled("div", {
  height: "45px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const TopContentContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const CheckIcon = styled(CheckOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  width: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CircleAvatar = styled("img", () => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
}));

const AccountNameText = styled("div", ({ $theme }) => ({
  ...fonts.normal,
  color: $theme.colors.white,
  marginLeft: $theme.sizing[1],
}));

const BalanceText = styled("div", ({ $theme }) => ({
  color: $theme.colors.black80,
  fontSize: "14px",
  marginLeft: "78px",
}));
