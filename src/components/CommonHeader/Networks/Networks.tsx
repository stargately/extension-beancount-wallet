import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import { useNetwork } from "../../../hooks";

type Props = {
  setNetwork?: (i: number) => void;
};

export const Networks: React.FC<Props> = (props: Props) => {
  const { current, availableNetworks, networkIndex } = useNetwork();
  const onClick = (e: any) => {
    const { key } = e;
    const index = availableNetworks.findIndex((net) => net.uri === key);
    props.setNetwork && props.setNetwork(index);
  };
  const menu = (
    <Menu onClick={onClick}>
      {availableNetworks?.map((net, index) => (
        <Menu.Item key={net.uri}>
          {index === networkIndex && <CheckOutlined />}
          {net.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Container>
      <Dropdown.Button overlay={menu}>{current.name}</Dropdown.Button>
    </Container>
  );
};

const Container = styled("div", {});
