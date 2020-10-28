import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { message, Spin } from "antd";
import { useSetRecoilState } from "recoil";

import { UnlockForm } from "./UnlockForm";
import { clientSingleton } from "../../daemon/client";
import { accountsList } from "../../recoil";

export const Unlock = withRouter(({ history }) => {
  const [loading, setLoading] = useState(false);
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: { password: string }) => {
    setLoading(true);
    const isOk = await clientSingleton.walletVarifyPasswd(values.password);
    try {
      if (isOk) {
        await clientSingleton.walletUnlock(values.password);
        const accounts = await clientSingleton.walletGetAccounts();
        setAccounts(accounts);
        history.push("/account");
      } else {
        message.info("password incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <UnlockForm onFinish={onFinish} />
    </Spin>
  );
});
