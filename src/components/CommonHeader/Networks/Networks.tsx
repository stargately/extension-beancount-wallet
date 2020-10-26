import React from "react";
import recoi from "recoil";
import { styled } from "onefx/lib/styletron-react";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import CheckOutlined from "@ant-design/icons/CheckOutlined";

import { networksAvailable, networkCurrent } from "../../../recoil";

type Props = {
  setNetwork?: (i: number) => void;
};

export const Networks: React.FC<Props> = (props: Props) => {
  const networks = recoi.useRecoilValue(networksAvailable);
  const current = recoi.useRecoilValue(networkCurrent);

  const onClick = (e: any) => {
    const { key } = e;
    const index = networks.findIndex((net) => net.uri === key);
    props.setNetwork && props.setNetwork(index);
  };

  const menu = (
    <Menu onClick={onClick}>
      {networks.map((net) => (
        <Menu.Item key={net.uri}>
          {net.uri === current.uri && <CheckOutlined />}
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
