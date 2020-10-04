import React from "react";
import { withRouter } from "react-router";
import message from "antd/lib/message";
import { CreatePasswordForm } from "./CreatePasswordForm";

import { useWallet } from "../../hooks";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  agreedTos: boolean;
};

export const CreatePassword = withRouter(({ history }) => {
  const { createWallet } = useWallet();
  const onFinish = async (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password and Confirm Password should be the same");
      return;
    }
    await createWallet(values.newPassword);
    // redirect back to welcome page
    history.replace("/");
  };

  return <CreatePasswordForm onFinish={onFinish} />;
});
