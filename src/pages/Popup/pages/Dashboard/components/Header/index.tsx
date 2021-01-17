import React from "react";
import { CommonHeader as MyCommonHeader } from "./CommonHeader";
import { Networks } from "./Networks";
import { AccountsOverlay } from "../AccountsOverlay";

export const Header = () => {
  return (
    <MyCommonHeader
      networks={<Networks />}
      overlay={<AccountsOverlay />}
    ></MyCommonHeader>
  );
};
