import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";

import { CommonMargin } from "../../styles/common-margin";
import { fonts } from "../../styles/style-font";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  remember: boolean;
};

type CreatePasswordProps = {
  onFinish?: (values: FormValues) => void;
};

export const CreatePasswordForm: React.FC<CreatePasswordProps> = ({
  onFinish,
}) => {
  return (
    <CreatePasswordWrap>
      <Paragraph>Secure your wallet with a password</Paragraph>
      <CommonMargin />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input.Password size={"large"} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
          ]}
        >
          <Input.Password size={"large"} />
        </Form.Item>

        <Form.Item {...layout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...layout}>
          <Button type="primary" htmlType="submit" size="large">
            Create
          </Button>
        </Form.Item>
      </Form>
    </CreatePasswordWrap>
  );
};

const CreatePasswordWrap = styled("div", {
  textAlign: "left",
});

const Paragraph = styled("div", {
  ...fonts.normal,
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
