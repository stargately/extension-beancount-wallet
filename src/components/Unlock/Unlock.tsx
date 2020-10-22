import React from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";

import { UnlockForm } from "./UnlockForm";
import { clientSingleton } from "../../daemon/client";

export const Unlock = withRouter(({ history }) => {
  const onFinish = async (values: { password: string }) => {
    const isOk = await clientSingleton.walletVarifyPasswd(values.password);
    if (isOk) {
      await clientSingleton.walletUnlock(values.password);
      history.push("/account");
    } else {
      message.info("password incorrect");
    }
  };

  return <UnlockForm onFinish={onFinish} />;
});
