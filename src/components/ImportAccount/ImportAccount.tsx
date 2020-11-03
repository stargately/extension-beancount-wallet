import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { ImportAccountForm } from "./ImportAccountForm";
import { clientSingleton } from "../../daemon/client";
import { accountsList } from "../../recoil";

type FormValues = {
  key: string;
};

export const ImportAccount: React.FC = () => {
  const history = useHistory();
  const [accounts, setAccount] = useRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await clientSingleton.walletCreateAccount(
      `IoTeX account ${accounts.length}`,
      values.key
    );
    const _accounts = await clientSingleton.walletGetAccounts();
    setAccount(_accounts);
    history.push("/account");
  };
  return <ImportAccountForm onFinish={onFinish}></ImportAccountForm>;
};
