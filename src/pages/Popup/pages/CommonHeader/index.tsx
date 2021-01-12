import React from "react";
import { CommonHeader as MyCommonHeader } from "./CommonHeader";
import { Networks } from "./Networks";
import { MyAccounts } from "../MyAccounts";

export const CommonHeader = () => {
  return (
    <MyCommonHeader
      networks={<Networks />}
      overlay={<MyAccounts />}
    ></MyCommonHeader>
  );
};
