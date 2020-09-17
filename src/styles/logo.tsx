import React from "react";
import { styled } from "onefx/lib/styletron-react";
import logo from "../assets/img/logo.png";

const LogoWithStyle = styled("img", (_props) => ({
  width: "125px",
  height: "125px",
  margin: "0 auto",
}));

export const Logo: React.FC = () => <LogoWithStyle src={logo} />;
