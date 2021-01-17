import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

import { defaultPostman } from "@/pages/Popup/postman";

import { accountAddress, accountsList } from "@/recoil";
import { Import as ImportForm } from "./Import";

type FormValues = {
  password: string;
  key: string;
};

export const Import: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const setAddress = useSetRecoilState(accountAddress);
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      await defaultPostman.createPassword(values.password, values.key);
    } finally {
      setLoading(false);
    }
    const accounts = await defaultPostman.getAccounts();
    setAccounts(accounts);
    setAddress(accounts[0].address);
    history.replace("/dashboard");
  };
  const onCancel = () => {
    history.goBack();
  };
  return (
    <Spin spinning={loading}>
      <ImportForm onFinish={onFinish} onCancel={onCancel}></ImportForm>
    </Spin>
  );
};
