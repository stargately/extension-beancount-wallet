import React from "react";
import { useRecoilValue } from "recoil";

import { accountTokens } from "@/recoil/account";
import { XRC20Tokens } from "./Tokens";

export const Tokens = () => {
  const tokens = useRecoilValue(accountTokens);
  return (
    <React.Fragment>
      <XRC20Tokens tokens={tokens}></XRC20Tokens>
    </React.Fragment>
  );
};
