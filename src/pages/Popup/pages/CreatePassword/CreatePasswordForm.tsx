import React, { useState } from "react";
import { styled } from "onefx/lib/styletron-react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";

import { CommonMargin } from "@/styles/common-margin";
import { fonts } from "@/styles/style-font";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
  agreedTos: boolean;
};

type CreatePasswordProps = {
  onFinish: (values: FormValues) => void;
  onCancel?: () => void;
};

export const CreatePasswordForm: React.FC<CreatePasswordProps> = ({
  onFinish,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <Container>
      <CommonMargin />
      <Paragraph>Secure your wallet with a password</Paragraph>
      <CommonMargin />
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ agreedTos: false }}
        onFinish={async (values) => {
          setLoading(true);
          await onFinish(values);
          setLoading(false);
        }}
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
            ({ getFieldValue }) => ({
              validator: async (_, value) => {
                if (!value || getFieldValue("newPassword") === value) {
                  return;
                }
                throw new Error(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          {...layout}
          name="agreedTos"
          valuePropName="checked"
          rules={[
            {
              validator: async (_, value) => {
                if (value) {
                  return;
                }
                throw new Error("Should accept agreement");
              },
            },
          ]}
        >
          <Checkbox>
            I have read and agree to the{" "}
            <a href="https://beancount.io/page/legal/terms-of-service/">
              terms of service
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...layout} shouldUpdate={true}>
          {() => (
            <Row justify="space-between">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length !== 0
                  }
                  loading={loading}
                >
                  {loading ? null : "Create"}
                </Button>
              </Col>
              <Col>
                <Button onClick={onCancel} size="large">
                  Cancel
                </Button>
              </Col>
            </Row>
          )}
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled("div", ({ $theme }) => ({
  textAlign: "left",
  padding: $theme.sizing[3],
}));

const Paragraph = styled("div", {
  ...fonts.normal,
  fontWeight: 600,
  lineHeight: "22px",
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
