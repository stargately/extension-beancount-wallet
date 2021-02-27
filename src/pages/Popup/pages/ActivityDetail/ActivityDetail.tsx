import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Loading from "@/pages/Popup/components/loading";
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
  const to =
    state.action.core?.transfer?.recipient ||
    state.action.core?.execution?.contract ||
    "";
  const d = new Date(state.timestamp.seconds * 1000);
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay() + 1}`;

  return (
    <ActivityDetailView
      actHash={state.actHash}
      from={address}
      to={to}
      gasPrice={state.action.core?.gasPrice}
      gasLimit={state.action.core?.gasLimit}
      nonce={state.action.core?.nonce}
      date={date}
      payload={state.action.core?.transfer?.payload || "-"}
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
