import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import logo from "../assets/img/logo.png";

type LogoStyleProps = {
  size?: "small" | "large";
  margin?: number;
};

type LogoStypeTypeProps = {
  $size: LogoStyleProps["size"];
  $margin: LogoStyleProps["margin"];
};

const LogoWithStyle = styled("img", (props: LogoStypeTypeProps) => {
  let size = "90";
  if (props.$size === "small") {
    size = "32";
  }
  return {
    cursor: "pointer",
    width: `${size}px`,
    height: `${size}px`,
    marginTop: `${props.$margin}px`,
  };
});

export const Logo: React.FC<LogoStyleProps> = ({ size = "large", margin }) => (
  <Row justify="center">
    <Col>
      <LogoWithStyle
        onClick={() => window.open("https://beancount.io/")}
        src={logo}
        $size={size}
        $margin={margin}
      />
    </Col>
  </Row>
);
