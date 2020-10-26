import React from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import { useSetRecoilState } from "recoil";

import { UnlockForm } from "./UnlockForm";
import { clientSingleton } from "../../daemon/client";
import { accountsList } from "../../recoil";

export const Unlock = withRouter(({ history }) => {
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: { password: string }) => {
    const isOk = await clientSingleton.walletVarifyPasswd(values.password);
    if (isOk) {
      await clientSingleton.walletUnlock(values.password);
      const accounts = await clientSingleton.walletGetAccounts();
      setAccounts(accounts);
      history.push("/account");
    } else {
      message.info("password incorrect");
    }
  };

  return <UnlockForm onFinish={onFinish} />;
});
