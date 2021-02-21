import React from "react";
import { Modal, Form, Input } from "antd";

type Values = {
  password: string;
};

export type PasswordValidatorModalProps = {
  visible: boolean;
  onOk?: (password: string) => void;
  onCancel?: () => void;
};

export const PasswordValidatorModal: React.FC<PasswordValidatorModalProps> = (
  props
) => {
  const [form] = Form.useForm();
  const onOk = async () => {
    const isOk = await form.validateFields();
    if (isOk) {
      const values = form.getFieldsValue();
      props.onOk && props.onOk(values.password);
    }
  };
  return (
    <Modal
      title="Validate Password"
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onCancel}
    >
      <Form<Values> form={form}>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input
            placeholder="Please input your password"
            type="password"
          ></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
