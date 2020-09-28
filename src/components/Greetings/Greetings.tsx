import React from "react";
import { withRouter } from "react-router";
import { Welcome } from "./Welcome";
import { useAccount, useWallet } from "../../hooks";

export const Greetings = withRouter(({ history }) => {
  const { hasPwd } = useWallet();
  const { address } = useAccount();

  // If has logined account, redirect to detail page
  if (address) {
    history.push("/detail");
  }
  // If has no password, redirect to create password page
  if (!hasPwd) {
    history.push("/createPassword");
  }

  return <Welcome />;
});
