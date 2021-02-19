import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Dropdown from "antd/lib/dropdown/dropdown";

type HeaderProps = {
  networks: React.ReactElement;
  overlay: React.ReactElement;
};

export const Header: React.FC<HeaderProps> = ({ networks, overlay }) => {
  return (
    <Container>
      {networks}
      <Dropdown overlay={overlay} trigger={["click"]}>
        <CircleAvatar src={require("@/assets/img/logo.png").default} />
      </Dropdown>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  width: "100%",
  background: "#F5F6FA",
  padding: "16px",
  position: "relative",
});

const CircleAvatar = styled("img", () => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
}));
