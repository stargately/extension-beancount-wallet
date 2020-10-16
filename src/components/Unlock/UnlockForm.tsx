import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import { Logo } from "../../styles/logo";
import { CommonMargin } from "../../styles/common-margin";
import { fonts } from "../../styles/style-font";

type FormValues = {
  password: string;
};

type UnlockFormProps = {
  onFinish?: (values: FormValues) => void;
};

export const UnlockForm: React.FC<UnlockFormProps> = ({ onFinish }) => {
  return (
    <Container>
      <Logo />
      <CommonMargin />
      <Title>Welcome Back!</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ password: "" }}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password size="large" placeholder="password" />
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
    </Container>
  );
};

const Container = styled("div", {
  padding: "16px",
});

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});
