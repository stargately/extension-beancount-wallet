import React from "react";
import { Tag } from "antd";
import { styled } from "onefx/lib/styletron-react";
import { fromRau } from "iotex-antenna/lib/account/utils";

import { Action } from "@/wallet-core/wallet-core";

type Props = {
  action: Action;
  onClick?: (e: Action) => void;
};

const ellipsis = (e = "") => `${e.slice(0, 6)}...${e.slice(-4)}`;

const ExecutionItem: React.FC<Props> = (props) => {
  const { execution } = props.action.action.core!;
  return (
    <Container onClick={() => props.onClick && props.onClick(props.action)}>
      <ItemContent>
        <OverView>
          <Tag color="blue">Execution</Tag>
          <ActStatus>Success</ActStatus>
        </OverView>
        <DetailView>
          <Account>
            <span>{fromRau(execution!.amount, "IOTX")}</span>
            <span> IOTX</span>
          </Account>
          <Address>
            <span>contract: </span>
            {ellipsis(execution!.contract)}
          </Address>
        </DetailView>
      </ItemContent>
    </Container>
  );
};

const TransferItem: React.FC<Props> = (props) => {
  const { transfer } = props.action.action.core!;
  return (
    <Container onClick={() => props.onClick && props.onClick(props.action)}>
      <ItemContent>
        <OverView>
          <Tag color="blue">Transfer</Tag>
          <ActStatus>Success</ActStatus>
        </OverView>
        <DetailView>
          <Account>
            <span>{fromRau(transfer!.amount, "IOTX")}</span>
            <span> IOTX</span>
          </Account>
          <Address>
            <span>recipient: </span>
            {ellipsis(transfer!.recipient)}
          </Address>
        </DetailView>
      </ItemContent>
    </Container>
  );
};

export const ActionItem: React.FC<Props> = (props) => {
  if (props.action.action.core?.transfer) {
    return <TransferItem {...props}></TransferItem>;
  }
  if (props.action.action.core?.execution) {
    return <ExecutionItem {...props}></ExecutionItem>;
  }
  return null;
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

const ItemContent = styled("div", ({ $theme }) => ({
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
