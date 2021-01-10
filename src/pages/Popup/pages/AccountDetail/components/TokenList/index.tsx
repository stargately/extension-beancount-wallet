import React from "react";
import { useRecoilValue } from "recoil";

import { accountTokens } from "@/recoil/account";
import { Xrc20TokensList } from "./TokenList";

export const TokensList = () => {
  const tokens = useRecoilValue(accountTokens);
  return (
    <React.Fragment>
      <Xrc20TokensList tokens={tokens}></Xrc20TokensList>
    </React.Fragment>
  );
};
