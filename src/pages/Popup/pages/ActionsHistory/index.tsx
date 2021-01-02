import React from "react";
import recoil from "recoil";
import Skeleton from "react-loading-skeleton";

import { accountActions } from "@/recoil";
import { ActionsHistory as MyActionsHistory } from "./ActionsHistory";

export const InnerActionsHistory = () => {
  const actions = recoil.useRecoilValue(accountActions);
  const items = actions.slice(0).reverse();
  console.log(items);
  return <MyActionsHistory actions={items}></MyActionsHistory>;
};

export const ActionsHistory = () => {
  return (
    <React.Suspense fallback={<Skeleton height={150} width="80%" />}>
      <InnerActionsHistory></InnerActionsHistory>
    </React.Suspense>
  );
};
