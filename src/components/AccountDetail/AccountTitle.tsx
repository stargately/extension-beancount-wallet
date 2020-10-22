import React from "react";
import { styled } from "onefx/lib/styletron-react";

type AccountTitleProps = {
  account?: {
    name: string;
    address: string;
  };
};

export const AccountTitle: React.FC<AccountTitleProps> = ({ account }) => {
  return (
    <Container>
      <Title>
        <Account>{account?.name}</Account>
        <Address title={account?.address}>{account?.address}</Address>
      </Title>
    </Container>
  );
};

const Container = styled("div", {
  textAlign: "center",
});

const Title = styled("div", ({ $theme }) => ({
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
  width: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
