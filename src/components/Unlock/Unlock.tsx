import React from "react";
import { withRouter } from "react-router";

import { UnlockForm } from "./UnlockForm";

import { useWallet } from "../../hooks";

export const Unlock = withRouter(() => {
  const { verifyPwd } = useWallet();
  const onFinish = (values: { password: string }) => {
    const result: boolean = verifyPwd(values.password);
    if (result) {
      // TODO
    }
  };

  return <UnlockForm onFinish={onFinish} />;
});
