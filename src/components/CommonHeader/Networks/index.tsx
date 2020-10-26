import React from "react";
import recoil from "recoil";
import { Networks as Net } from "./Networks";
import { networkIndex } from "../../../recoil";

export const Networks: React.FC = () => {
  const setNetworkIndex = recoil.useSetRecoilState(networkIndex);
  return <Net setNetwork={setNetworkIndex}></Net>;
};
