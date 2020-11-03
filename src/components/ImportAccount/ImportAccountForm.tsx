import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import { Logo } from "../../styles/logo";
import { CommonMargin } from "../../styles/common-margin";
import { fonts } from "../../styles/style-font";

type FormValues = {
  key: string;
};

type ImportAccountFormProps = {
  onFinish?: (values: FormValues) => void;
};

export const ImportAccountForm: React.FC<ImportAccountFormProps> = ({
  onFinish,
}) => {
  return (
    <Container>
      <Logo />
      <CommonMargin />
      <Title>Import Account</Title>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ key: "" }}>
        <Form.Item
          label="Private Key"
          name="key"
          rules={[
            { required: true, message: "Please input your Private Key!" },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Import
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled("div", {
  padding: "16px",
  width: "100%",
});

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});
