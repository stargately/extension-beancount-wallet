import React from "react";
import recoil from "recoil";
import { withRouter } from "react-router";
import message from "antd/lib/message";
import { CreatePasswordForm } from "./CreatePasswordForm";
import { getSingleton } from "../../daemon/client";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  agreedTos: boolean;
};

export const CreatePassword = withRouter(({ history }) => {
  const onFinish = async (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Password and Confirm Password should be the same");
      return;
    }
    await getSingleton().createPassword(values.newPassword);
    history.replace("/account");
  };

  return <CreatePasswordForm onFinish={onFinish} />;
});
