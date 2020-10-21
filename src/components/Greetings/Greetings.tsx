import React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Welcome } from "./Welcome";
import Loading from "../Loading";
import { walletInitiated, walletKeyring } from "../../recoil/atom";

const Container = () => {
  const initiated = useRecoilValue(walletInitiated);
  const keyring = useRecoilValue(walletKeyring);
  if (initiated && !keyring.isUnlocked) {
    return <Redirect to="/unlock"></Redirect>;
  }
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
