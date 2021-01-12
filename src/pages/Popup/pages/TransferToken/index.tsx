import React, { useState } from "react";
import { message, Spin } from "antd";
import { useHistory } from "react-router-dom";

import { defaultPostman } from "@/pages/Popup/postman";

import { TransferTokenForm } from "./TransferTokenForm";

export const TransferToken = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await defaultPostman.transferToken(
        values.recipient,
        values.amount,
        values.gasPrice,
        values.gasLimit
      );
      // force wait 5.5 seconds for transaction completed
      await new Promise((resolve) => {
        setTimeout(resolve, 5500);
      });
      message.success("Transfer Success");
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
