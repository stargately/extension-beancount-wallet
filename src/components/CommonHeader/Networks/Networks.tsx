import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import { useNetwork } from "../../../hooks";

export const Networks: React.FC = () => {
  const { current, availableNetworks, networkIndex } = useNetwork();
  const handleButtonClick = () => {
    // TODO
  };
  const handleMenuClick = () => {
    // TODO
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px solid #eee",
          padding: "8px 0 12px",
          fontWeight: "bold",
        }}
      >
        Networks
      </div>
      {availableNetworks?.map((net, index) => (
        <Menu.Item key={net.uri}>
          {index === networkIndex && <CheckOutlined />}
          {net.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <NetworkWrap>
      <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
        {current.name}
      </Dropdown.Button>
    </NetworkWrap>
  );
};

const NetworkWrap = styled("div", {});
