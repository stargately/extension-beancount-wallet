import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { useRecoilValue } from "recoil";

import { fonts } from "@/styles/style-font";
import { accountCurrentMeta } from "@/recoil";

export const Balance = () => {
  const meta = useRecoilValue(accountCurrentMeta);
  const nums = +meta.balance / 10 ** 18;
  return (
    <Container>
      <span>
        {`${nums.toFixed(2)}`}
        <span> IOTX</span>
      </span>
    </Container>
  );
};

const Container = styled("div", {
  ...fonts.h1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "100%",
  flexShrink: 0,
});
