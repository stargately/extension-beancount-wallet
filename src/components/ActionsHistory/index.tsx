import React from "react";
import recoil from "recoil";
import Skeleton from "react-loading-skeleton";

import { ActionsHistory as MyActionsHistory } from "./ActionsHistory";
import { accountActions, accountAddress } from "../../recoil";

export const InnerActionsHistory = () => {
  const actions = recoil.useRecoilValue(accountActions);
  const address = recoil.useRecoilValue(accountAddress);
  const items = actions
    .map((e) => e.action.core)
    .map((i) => ({
      address,
      recipient: i?.transfer?.recipient,
      amount: i?.transfer?.amount,
    }));
  return <MyActionsHistory actions={items}></MyActionsHistory>;
};

export const ActionsHistory = () => {
  return (
    <React.Suspense fallback={<Skeleton height={150} width={"80%"} />}>
      <InnerActionsHistory></InnerActionsHistory>
    </React.Suspense>
  );
};
