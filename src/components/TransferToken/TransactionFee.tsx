import React from "react";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Radio from "antd/lib/radio";

export const TransactionFee: React.FC = () => {
  return (
    <>
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
        <Radio.Group size={"large"} value={"large"}>
          <Radio.Button value="large">Slow</Radio.Button>
          <Radio.Button value="default">Average</Radio.Button>
          <Radio.Button value="small">Fast</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item hidden={true} name={"gasPrice"}>
        <Input></Input>
      </Form.Item>

      <Form.Item hidden={true} name={"gasLimit"}>
        <Input></Input>
      </Form.Item>
    </>
  );
};
