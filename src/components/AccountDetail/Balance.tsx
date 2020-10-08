import React, { useEffect, useState } from "react";
import { styled } from "onefx/lib/styletron-react";

import { useAccount } from "../../hooks";
import { walletSingleton } from "../../wallet-core";
import { fonts } from "../../styles/style-font";

export const Balance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string>();
  useEffect(() => {
    (async () => {
      const meta = await walletSingleton.getAccountMeta(address);
      setBalance(meta?.accountMeta?.balance);
    })();
  }, [address]);
  return <Container>{balance} IOTX</Container>;
};

const Container = styled("div", {
  ...fonts.h1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "100%",
});
