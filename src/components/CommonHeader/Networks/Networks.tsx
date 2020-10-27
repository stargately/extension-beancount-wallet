import React from "react";

import { styled } from "onefx/lib/styletron-react";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import { INetworkItem } from "../../../config/networks";

type Props = {
  setNetwork?: (i: number) => void;
  networks: INetworkItem[];
  current: INetworkItem;
};

export const Networks: React.FC<Props> = (props: Props) => {
  const onClick = (e: any) => {
    const { key } = e;
    const index = props.networks.findIndex((net) => net.uri === key);
    props.setNetwork && props.setNetwork(index);
  };

  const menu = (
    <Menu onClick={onClick}>
      {props.networks.map((net) => (
        <Menu.Item key={net.uri}>
          {net.uri === props.current.uri && <CheckOutlined />}
          {net.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Container>
      <Dropdown.Button overlay={menu}>{props.current.name}</Dropdown.Button>
    </Container>
  );
};

const Container = styled("div", {});
