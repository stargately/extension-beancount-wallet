import React from "react";
import recoil from "recoil";

import { networkIndex, networksAvailable, networkCurrent } from "@/recoil";
import { Networks as MyNetworks } from "./Networks";

export const Networks: React.FC = () => {
  const setNetworkIndex = recoil.useSetRecoilState(networkIndex);
  const networks = recoil.useRecoilValue(networksAvailable);
  const current = recoil.useRecoilValue(networkCurrent);
  return (
    <MyNetworks
      networks={networks}
      current={current}
      setNetwork={setNetworkIndex}
    ></MyNetworks>
  );
};
