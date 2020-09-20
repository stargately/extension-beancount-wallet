import React from "react";
import Form, { RuleObject } from "antd/lib/form";
import Input from "antd/lib/input";
import { validateAddress } from "iotex-antenna/lib/account/utils";
import { formItemLayout } from "./formStyles";

export const AddRecipient: React.FC = () => {
  return (
    <div>
      <Form.Item
        {...formItemLayout}
        name="recipient"
        label="Recipient"
        rules={[
          { required: true, message: "Please enter your recipient address." },
          {
            validator: (_rule: RuleObject, value, callback) => {
              if (value && !validateAddress(value)) {
                callback("address is invalid");
              } else {
                callback();
              }
            },
          },
        ]}
      >
        <Input size={"large"} placeholder="Address (io...)" />
      </Form.Item>
    </div>
  );
};
