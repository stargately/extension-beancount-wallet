import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Skeleton from "react-loading-skeleton";
import { useAccount } from "../../hooks";
import { fonts } from "../../styles/style-font";
import { useAccountMeta } from "./hooks/useAccountMeta";

export const Balance = () => {
  const { account } = useAccount();
  const { loading, balance } = useAccountMeta(account);
  return (
    <Container>
      {loading ? (
        <Skeleton width={80} />
      ) : (
        `${balance} ${account?.getCoinType() || "IOTX"}`
      )}
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
});
