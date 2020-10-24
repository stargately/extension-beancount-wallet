import React from "react";
import { withRouter } from "react-router-dom";
import message from "antd/lib/message";
import { CreatePasswordForm } from "./CreatePasswordForm";
import { clientSingleton } from "../../daemon/client";
import { useAccount } from "../../hooks";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  agreedTos: boolean;
};

export const CreatePassword = withRouter(({ history }) => {
  const { updateAccounts } = useAccount();
  const onFinish = async (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password and Confirm Password should be the same");
      return;
    }
    await clientSingleton.createPassword(values.newPassword);
    // update account state
    updateAccounts();
    history.replace("/account");
  };

  return <CreatePasswordForm onFinish={onFinish} />;
});
