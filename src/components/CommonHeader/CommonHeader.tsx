import React from "react";
import { styled } from "onefx/lib/styletron-react";
import UserOutlined from "@ant-design/icons/UserOutlined";

import { Networks } from "./Networks";
import { Logo } from "../../styles/logo";

export const CommonHeader: React.FC = () => {
  return (
    <Container>
      <Logo size="small" />
      <Networks />
      {/* account menu */}
      <Avator />
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  width: "100%",
  background: "#f2f3f4",
  padding: "16px",
  position: "relative",
});

const Avator = styled(UserOutlined, {
  fontSize: "20px",
});
