import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import { Logo } from "../../styles/logo";
import { CommonMargin } from "../../styles/common-margin";
import { formItemLayout } from "../../styles/formStyles";
import { fonts } from "../../styles/style-font";

type FormValues = {
  password: string;
};

type UnlockFormProps = {
  onFinish?: (values: FormValues) => void;
};

export const UnlockForm: React.FC<UnlockFormProps> = ({ onFinish }) => {
  return (
    <>
      <Logo />
      <CommonMargin />
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Welcome Back!
      </Title>
      <FormWrap>
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password size={"large"} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Unlock
            </Button>
          </Form.Item>
        </Form>
      </FormWrap>
    </>
  );
};

const FormWrap = styled("div", {
  textAlign: "left",
});

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});
