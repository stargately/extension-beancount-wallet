import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import logo from "../assets/img/logo.png";

type LogoStyleProps = {
  size?: "small" | "large";
};

type LogoStypeTypeProps = {
  $size: LogoStyleProps["size"];
};

const LogoWithStyle = styled("img", (props: LogoStypeTypeProps) => {
  let size = "125";
  if (props.$size === "small") {
    size = "32";
  }
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
});

export const Logo: React.FC<LogoStyleProps> = ({ size = "large" }) => (
  <Row justify="center">
    <Col>
      <LogoWithStyle src={logo} $size={size} />
    </Col>
  </Row>
);
