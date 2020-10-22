import React from "react";
import { TransferTokenForm } from "./TransferTokenForm";

export const TransferToken = () => {
  const onFinish = () => {
    // TODO: "Qiu"
    // account?.setProvider(current.uri);
    // const txResult = await account?.transfer({
    //   to: String(address),
    //   amount: "1",
    //   gasPrice: "100000000000000000",
    //   gasLimit: "1000000",
    // });
    // setTxHash(txResult?.hash || "");
  };
  return <TransferTokenForm onFinish={onFinish}></TransferTokenForm>;
};
