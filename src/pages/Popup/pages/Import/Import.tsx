import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { Form, Input, Button, Row, Col } from "antd";

import { Logo } from "@/styles/logo";
import { CommonMargin } from "@/styles/common-margin";
import { fonts } from "@/styles/style-font";

type FormValues = {
  password: string;
  key: string;
};

type ImportProps = {
  onFinish?: (values: FormValues) => void;
  onCancel?: () => void;
};

export const Import: React.FC<ImportProps> = ({ onFinish, onCancel }) => {
  return (
    <Container>
      <Logo />
      <CommonMargin />
      <Title>Import</Title>
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
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your New Password!" },
            () => ({
              validator(_, value) {
                if (
                  !(
                    /[a-zA-Z]+/.test(value) &&
                    /[0-9]*/.test(value) &&
                    String(value).length >= 6
                  )
                ) {
                  return Promise.reject(
                    new Error(
                      "Passwords must consist of letters and numbers and be longer than 6"
                    )
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit" size="large">
                Import
              </Button>
            </Col>
            <Col>
              <Button htmlType="button" size="large" onClick={onCancel}>
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
});

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});
