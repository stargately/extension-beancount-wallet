import React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Loading from "@/pages/Popup/components/loading";
import { walletInitiated, walletLocked } from "@/recoil/wallet";
import { Welcome } from "./Welcome";

const Container = () => {
  const initiated = useRecoilValue(walletInitiated);
  const locked = useRecoilValue(walletLocked);
  if (initiated && locked) {
    return <Redirect to="/unlock"></Redirect>;
  }
  if (initiated) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return <Welcome />;
};

export const Greetings = () => {
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Container></Container>
    </React.Suspense>
  );
};
