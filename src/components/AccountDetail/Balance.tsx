import React, { Suspense } from "react";
import { styled } from "onefx/lib/styletron-react";
import Skeleton from "react-loading-skeleton";
import { useRecoilValue } from "recoil";

import { fonts } from "../../styles/style-font";
import { accountCurrentMeta } from "../../recoil";

export const MyBalance = () => {
  const meta = useRecoilValue(accountCurrentMeta);
  const nums = +meta.balance / 10 ** 18;
  return <span>{`${nums.toFixed(2)} ${"IOTX"}`}</span>;
};

export const Balance = () => {
  return (
    <Container>
      <Suspense fallback={<Skeleton width={80} />}>
        <MyBalance></MyBalance>
      </Suspense>
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
