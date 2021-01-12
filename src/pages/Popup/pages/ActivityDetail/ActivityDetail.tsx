import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Loading from "@/pages/Popup/components/Loading";
import { Action } from "@/wallet-core/wallet-core";
import { accountAddress } from "@/recoil";
import { defaultPostman } from "@/pages/Popup/postman";

import { ActivityDetailView } from "./ActivityDetailView";

const ActivityDetailContainer = () => {
  const [state, setState] = useState<Action>();
  const { id } = useParams<{ id: string }>();
  const address = useRecoilValue(accountAddress);

  useEffect(() => {
    defaultPostman.queryActionDetail(id).then((res: any) => {
      setState(res[0]);
    });
  }, []);

  if (!state) {
    return <Loading></Loading>;
  }

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
