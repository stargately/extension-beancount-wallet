import React from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import recoil from "recoil";
import { TransferTokenForm } from "./TransferTokenForm";
import { accountAddress, networkCurrent } from "../../recoil";
import { clientSingleton } from "../../daemon/client";

export const TransferToken = () => {
  const [address, setAddress] = recoil.useRecoilState(accountAddress);
  const current = recoil.useRecoilValue(networkCurrent);
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
      setAddress((cur) => cur);
      history.goBack();
    } catch (e) {
      message.error("Transfer Failure");
    }
  };

  return <TransferTokenForm onFinish={onFinish}></TransferTokenForm>;
};
