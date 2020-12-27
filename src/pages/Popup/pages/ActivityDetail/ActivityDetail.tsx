import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Loading from "@/pages/Popup/components/Loading";
import { Action } from "@/wallet-core/wallet-core";
import { accountAddress } from "@/recoil";
import { ActivityDetailView } from "./ActivityDetailView";

const ActivityDetailContainer = () => {
  const location = useLocation<Action>();
  const { state } = location;
  const address = useRecoilValue(accountAddress);

  return (
    <ActivityDetailView
      actHash={state.actHash}
      from={address}
      to={state.action.core?.transfer?.recipient}
      gasPrice={state.action.core?.gasPrice}
      gasLimit={state.action.core?.gasLimit}
      nonce={state.action.core?.nonce}
      payload={state.action.core?.transfer?.payload}
    ></ActivityDetailView>
  );
};

export const ActivityDetail = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ActivityDetailContainer></ActivityDetailContainer>
    </React.Suspense>
  );
};
