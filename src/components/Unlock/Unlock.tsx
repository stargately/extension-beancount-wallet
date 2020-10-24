import React from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";

import { UnlockForm } from "./UnlockForm";
import { clientSingleton } from "../../daemon/client";
import { useAccount } from "../../hooks";

export const Unlock = withRouter(({ history }) => {
  const { updateAccounts } = useAccount();
  const onFinish = async (values: { password: string }) => {
    const isOk = await clientSingleton.walletVarifyPasswd(values.password);
    if (isOk) {
      await clientSingleton.walletUnlock(values.password);
      // update account state
      updateAccounts();
      history.push("/account");
    } else {
      message.info("password incorrect");
    }
  };

  return <UnlockForm onFinish={onFinish} />;
});
