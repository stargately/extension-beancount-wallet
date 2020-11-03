import React from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { ImportKeyForm } from "./ImportKeyForm";
import { clientSingleton } from "../../daemon/client";
import { accountAddress, accountsList } from "../../recoil";

type FormValues = {
  password: string;
  key: string;
};

export const ImportKey: React.FC = () => {
  const history = useHistory();
  const setAddress = useSetRecoilState(accountAddress);
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await clientSingleton.createPassword(values.password, values.key);
    const accounts = await clientSingleton.walletGetAccounts();
    setAccounts(accounts);
    setAddress(accounts[0].address);
    history.replace("/account");
  };
  return <ImportKeyForm onFinish={onFinish}></ImportKeyForm>;
};
