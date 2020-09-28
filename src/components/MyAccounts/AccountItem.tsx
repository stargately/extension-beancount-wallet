import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { CheckOutlined } from "@ant-design/icons";
import { fonts } from "../../styles/style-font";

interface AccountItemProps {
  checked: boolean;
}

export const AccountItem = (props: AccountItemProps) => {
  return (
    <ItemContainer>
      <TopContentContainer>
        <CheckIcon
          style={{
            visibility: props.checked ? "visible" : "hidden",
          }}
        />

        <CircleAvatar src={require("../../assets/img/logo.png")} />

        <AccountNameText>Account 1</AccountNameText>
      </TopContentContainer>

      <BalanceText>$504.40 USD</BalanceText>
    </ItemContainer>
  );
};

const ItemContainer = styled("div", ({ $theme }) => ({
  paddingTop: $theme.sizing[2],
  paddingBottom: $theme.sizing[2],
}));

const TopContentContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const CheckIcon = styled(CheckOutlined, ({ $theme }) => ({
  color: $theme.colors.white,
  marginLeft: $theme.sizing[4],
}));

const CircleAvatar = styled("img", ({ $theme }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginLeft: $theme.sizing[1],
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
