import React from "react";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import { formItemLayout } from "./formStyles";

export const AmountInput: React.FC = () => {
  return (
    <Form.Item
      {...formItemLayout}
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          message: "Please enter the amount of tokens you want to transfer.",
        },
      ]}
    >
      <Input size="large" />
    </Form.Item>
  );
};
