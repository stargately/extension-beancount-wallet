import React from "react";
import { styled } from "onefx/lib/styletron-react";
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
  <LogoWithStyle src={logo} $size={size} />
);
