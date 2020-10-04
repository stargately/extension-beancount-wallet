import React from "react";
import { withRouter } from "react-router";

import { UnlockForm } from "./UnlockForm";

import { useWallet } from "../../hooks";

export const Unlock = withRouter(() => {
  const { unlock } = useWallet();
  const onFinish = (values: { password: string }) => {
    const result = unlock(values.password);
    if (result) {
      // TODO
      console.log(`unlocked wallet ${result}`);
    }
  };

  return <UnlockForm onFinish={onFinish} />;
});
