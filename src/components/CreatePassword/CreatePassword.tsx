import React from "react";
import { withRouter } from "react-router";
import message from "antd/lib/message";
import { CreatePasswordForm } from "./CreatePasswordForm";

import { useWallet } from "../../hooks";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  remember: boolean;
};

export const CreatePassword = withRouter(({ history }) => {
  const { setPwd } = useWallet();
  const onFinish = (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password and Confirm Password should be the same");
      return;
    }
    setPwd(values.newPassword);
    // redirect back to welcome page
    history.replace("/");
  };

  return <CreatePasswordForm onFinish={onFinish} />;
});
