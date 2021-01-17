import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useHistory } from "react-router-dom";

import { Logo } from "@/styles/logo";
import { CommonMargin } from "@/styles/common-margin";
import { fonts } from "@/styles/style-font";

type FormValues = {
  name: string;
  privateKey: string;
};

type NewAccountProps = {
  onFinish?: (values: FormValues) => void;
  mode: "create" | "import";
};

export const NewAccount: React.FC<NewAccountProps> = ({ onFinish, mode }) => {
  const history = useHistory();
  return (
    <Container>
      <Logo />
      <CommonMargin />
      <Title>New Account</Title>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ key: "" }}>
        <Form.Item
          label="Account Name"
          name="name"
          rules={[
            { required: true, message: "Please input your Account Name" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        {mode === "import" ? (
          <Form.Item
            label="Private Key"
            name="privateKey"
            rules={[
              { required: true, message: "Please input your Private Key" },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
        ) : null}
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit" size="large">
                {mode === "import" ? "Import" : "Create"}
              </Button>
            </Col>
            <Col>
              <Button size="large" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col>
          </Row>
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
