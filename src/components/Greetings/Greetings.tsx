import React from "react";
import { withRouter } from "react-router";
import { Welcome } from "./Welcome";
import { useWallet } from "../../hooks";

export const Greetings = withRouter(({ history }) => {
  const { wallet } = useWallet();

  // If has logined account, redirect to detail page
  if (wallet.isUnLocked) {
    history.push("/account");
  }

  return <Welcome />;
});
