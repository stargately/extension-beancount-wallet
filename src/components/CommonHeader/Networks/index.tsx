import React from "react";
import { Networks as Net } from "./Networks";
import { useNetwork } from "../../../hooks/use-network";

export const Networks: React.FC = () => {
  const { setNetwork } = useNetwork();
  return <Net setNetwork={setNetwork}></Net>;
};
