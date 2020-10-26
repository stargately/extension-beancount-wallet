import React from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { TransferTokenForm } from "./TransferTokenForm";
import { useAccount, useNetwork } from "../../hooks";
import { clientSingleton } from "../../daemon/client";

export const TransferToken = () => {
  const { address } = useAccount();
  const { current } = useNetwork();
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await clientSingleton.walletTransferToken({
        from: address,
        url: current.uri,
        to: values.recipient,
        amount: values.amount,
        gasLimit: values.gasLimit,
        gasPrice: values.gasPrice,
      });
      message.success("Transfer Success");
      history.goBack();
    } catch (e) {
      message.error("Transfer Failure");
    }
  };

  return <TransferTokenForm onFinish={onFinish}></TransferTokenForm>;
};
