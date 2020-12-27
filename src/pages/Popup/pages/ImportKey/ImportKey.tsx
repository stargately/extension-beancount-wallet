import React from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { defaultPostman } from "@/pages/Popup/postman";

import { accountAddress, accountsList } from "@/recoil";
import { ImportKeyForm } from "./ImportKeyForm";

type FormValues = {
  password: string;
  key: string;
};

export const ImportKey: React.FC = () => {
  const history = useHistory();
  const setAddress = useSetRecoilState(accountAddress);
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await defaultPostman.createPassword(values.password, values.key);
    const accounts = await defaultPostman.getAccounts();
    setAccounts(accounts);
    setAddress(accounts[0].address);
    history.replace("/account");
  };
  return <ImportKeyForm onFinish={onFinish}></ImportKeyForm>;
};
