import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { fromRau } from "iotex-antenna/lib/account/utils";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

import { Action } from "../../wallet-core/wallet-core";

export type IAction = {
  address: string;
  actionHash: string;
  recipient?: string;
  amount?: string;
  raw?: Action;
};

type Props = IAction & {
  onClick?: (e: IAction) => void;
};

export const ActionItem: React.FC<Props> = (props) => {
  const title =
    props.address === props.recipient ? "Receive IOTX" : "Send IOTX";
  const account = fromRau(`${props.amount || 0} `, "iotx");
  const ellipsis = (e: string) => `${e.slice(0, 6)}...${e.slice(-8)}`;
  let address = props.address === props.recipient ? "From:  " : "To:  ";
  address += ellipsis(`${props.recipient || ""}`);
  return (
    <Container onClick={() => props.onClick && props.onClick(props)}>
      <LeftIcon>
        {props.address === props.recipient ? (
          <LoginOutlined />
        ) : (
          <LogoutOutlined />
        )}
      </LeftIcon>
      <RightContent>
        <OverView>
          <Title>{title}</Title>
          <ActStatus>Success</ActStatus>
        </OverView>
        <DetailView>
          <Account>
            <span>{props.address === props.recipient ? " + " : " - "}</span>
            <span>{account}</span>
            <span> IOTX</span>
          </Account>
          <Address>{address}</Address>
        </DetailView>
      </RightContent>
    </Container>
  );
};

const Container = styled("div", () => ({
  width: "100%",
  height: "55px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  cursor: "pointer",
}));

const LeftIcon = styled("div", {
  width: "50px",
  height: "55px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const RightContent = styled("div", ({ $theme }) => ({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: "10px",
  marginRight: "10px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: $theme.colors.black40,
}));

const OverView = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
});

const Title = styled("div", {
  fontSize: 16,
});

const ActStatus = styled("div", ({ $theme }) => ({
  color: $theme.colors.primary,
  fontSize: "12px",
}));

const DetailView = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-end",
});

const Account = styled("div", () => ({}));

const Address = styled("div", {
  fontSize: "12px",
});
