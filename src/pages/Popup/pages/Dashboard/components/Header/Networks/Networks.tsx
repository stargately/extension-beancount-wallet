import React from "react";

import { styled } from "onefx/lib/styletron-react";
import { Select } from "antd";
import Menu from "antd/lib/menu";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import { INetworkItem } from "@/config/networks";

const { Option } = Select;

type Props = {
  setNetwork?: (i: number) => void;
  networks: INetworkItem[];
  current: INetworkItem;
};

export const Networks: React.FC<Props> = (props: Props) => {
  const onClick = (key: any) => {
    console.log(key);
    const index = props.networks.findIndex((net) => net.uri === key);
    props.setNetwork && props.setNetwork(index);
  };

  return (
    <Container>
      <Select
        defaultValue={props.current.uri}
        style={{ width: "100%" }}
        className="netWorkSelect"
        onSelect={onClick}
      >
        {props.networks.map((net) => (
          <Option value={net.uri} key={net.uri}>
            {net.uri === props.current.uri && <Dot />}
            {net.name}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

const Container = styled("div", {
  flex: 1,
  marginRight: "20px",
});

const Dot = styled("span", () => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "#00B4A0",
  display: "inline-block",
  marginRight: "8px",
}));
