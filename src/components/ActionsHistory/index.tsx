import React from "react";
import recoil from "recoil";
import Skeleton from "react-loading-skeleton";

import { ActionsHistory as MyActionsHistory } from "./ActionsHistory";
import { accountActions, accountAddress } from "../../recoil";

export const InnerActionsHistory = () => {
  const actions = recoil.useRecoilValue(accountActions);
  console.log(actions);
  const address = recoil.useRecoilValue(accountAddress);
  const items = actions
    .slice(0)
    .reverse()
    .map((e) => ({
      address,
      actionHash: e.actHash,
      recipient: e.action.core?.transfer?.recipient,
      amount: e.action.core?.transfer?.amount,
      raw: e,
    }));
  return <MyActionsHistory actions={items}></MyActionsHistory>;
};

export const ActionsHistory = () => {
  return (
    <React.Suspense fallback={<Skeleton height={150} width="80%" />}>
      <InnerActionsHistory></InnerActionsHistory>
    </React.Suspense>
  );
};
