import React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Welcome } from "./Welcome";
import Loading from "../Loading";
import { walletInitiated } from "../../pages/Popup/state";

const Container = () => {
  const initiated = useRecoilValue(walletInitiated);
  // const locked = useRecoilValue(walletLocked)
  if (initiated) {
    return <Redirect to="/account"></Redirect>;
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
