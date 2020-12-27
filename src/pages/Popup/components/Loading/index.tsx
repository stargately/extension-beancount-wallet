import React from "react";
import { Spin } from "antd";
import { styled } from "onefx/lib/styletron-react";

export default function Loading() {
  return (
    <Container>
      <Spin></Spin>
    </Container>
  );
}

const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
