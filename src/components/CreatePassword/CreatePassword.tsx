import React from "react";
import { withRouter } from "react-router-dom";
import message from "antd/lib/message";
import { useSetRecoilState } from "recoil";

import { CreatePasswordForm } from "./CreatePasswordForm";
import { clientSingleton } from "../../daemon/client";
import { accountAddress, accountsList } from "../../recoil";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  agreedTos: boolean;
};

export const CreatePassword = withRouter(({ history }) => {
  const setAddress = useSetRecoilState(accountAddress);
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password and Confirm Password should be the same");
      return;
    }
    await clientSingleton.createPassword(values.newPassword);
    const accounts = await clientSingleton.walletGetAccounts();
    setAccounts(accounts);
    setAddress(accounts[0].address);
    history.replace("/account");
  };

  return <CreatePasswordForm onFinish={onFinish} />;
});
