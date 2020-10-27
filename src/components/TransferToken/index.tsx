import React, { useState } from "react";
import { message, Spin } from "antd";
import { useHistory } from "react-router-dom";
import recoil from "recoil";

import { TransferTokenForm } from "./TransferTokenForm";
import { accountAddress, networkCurrent } from "../../recoil";
import { clientSingleton } from "../../daemon/client";
import { useRefreshAccountMeta } from "../../hooks";

export const TransferToken = () => {
  const address = recoil.useRecoilValue(accountAddress);
  const current = recoil.useRecoilValue(networkCurrent);
  const history = useHistory();
  const refreshAccountMeta = useRefreshAccountMeta();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await clientSingleton.walletTransferToken({
        from: address,
        url: current.uri,
        to: values.recipient,
        amount: values.amount,
        gasLimit: values.gasLimit,
        gasPrice: values.gasPrice,
      });
      // force wait 10 seconds for transaction completed
      await new Promise((resolve) => {
        setTimeout(resolve, 10000);
      });
      message.success("Transfer Success");
      refreshAccountMeta();
      history.goBack();
    } catch (e) {
      message.error("Transfer Failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <TransferTokenForm onFinish={onFinish}></TransferTokenForm>
    </Spin>
  );
};
