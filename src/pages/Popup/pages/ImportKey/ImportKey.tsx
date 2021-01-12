import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

import { defaultPostman } from "@/pages/Popup/postman";

import { accountAddress, accountsList } from "@/recoil";
import { ImportKeyForm } from "./ImportKeyForm";

type FormValues = {
  password: string;
  key: string;
};

export const ImportKey: React.FC = () => {
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
    history.replace("/account");
  };
  return (
    <Spin spinning={loading}>
      <ImportKeyForm onFinish={onFinish}></ImportKeyForm>
    </Spin>
  );
};
