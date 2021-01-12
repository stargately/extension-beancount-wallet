import React from "react";
import { defaultPostman } from "@/pages/Popup/postman";
import { fromRau } from "iotex-antenna/lib/account/utils";
import { Spin } from "antd";
import { ConfirmTransactionComponent } from "./confirm-transaction";

export const ConfirmTransaction = function () {
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<Record<string, any>>({
    amount: "",
    toContract: "",
    gasPrice: "",
    gasLimit: "",
    data: "",
  });
  const onConfirm = () => {
    defaultPostman.confirmLastestAction();
    setLoading(true);
    setTimeout(() => {
      window.close();
      setLoading(false);
    }, 5000);
  };
  const onCancel = () => {
    defaultPostman.cancelLastestAction();
    window.close();
  };
  React.useEffect(() => {
    defaultPostman.getLastestUnapprovedAction().then((res) => {
      setValues({
        amount: `${fromRau(res.env.execution.amount, "IOTX")} IOTX`,
        toContract: res.env.execution.contract,
        gasPrice: `${res.env.gasPrice} Rau`,
        gasLimit: `${res.env.gasLimit} Rau`,
      });
    });
  }, []);
  return (
    <Spin spinning={loading}>
      <ConfirmTransactionComponent
        toContract={values.toContract}
        amount={values.amount}
        gasPrice={values.gasPrice}
        gasLimit={values.gasLimit}
        onConfirm={onConfirm}
        onCancel={onCancel}
      ></ConfirmTransactionComponent>
    </Spin>
  );
};
