import React from "react";
import { withRouter } from "react-router";
import { Welcome } from "./Welcome";
import { useAccount } from "../../hooks";

export const Greetings = withRouter(({ history }) => {
  const { address } = useAccount();

  // If has logined account, redirect to detail page
  if (address) {
    history.push("/detail");
  }

  return <Welcome />;
});
