import React, { Fragment } from "react";
import Input from "antd/lib/input";
import Form, { FormInstance } from "antd/lib/form";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import { formItemLayout } from "./formStyles";

type Props = {
  form: FormInstance;
};

// TODO(tian): should get from hooks
const baseGasLimit = 200000;
const baseGasPrice = 1000000000000;

const gasOpts: Record<string, { gasLimit: number; gasPrice: number }> = {
  slow: {
    gasLimit: baseGasLimit * 0.6,
    gasPrice: baseGasPrice * 0.6,
  },
  average: {
    gasLimit: baseGasLimit,
    gasPrice: baseGasPrice,
  },
  fast: {
    gasLimit: baseGasLimit * 2,
    gasPrice: baseGasPrice * 2,
  },
};

export const TransactionFeeInput: React.FC<Props> = (props) => {
  const onChangeSpeed = (e: RadioChangeEvent) => {
    const setup = gasOpts[e.target.value] || gasOpts.average;
    props.form.setFields([
      {
        name: "gasLimit",
        value: setup.gasLimit,
      },
      {
        name: "gasPrice",
        value: setup.gasPrice,
      },
    ]);
  };
  return (
    <Fragment>
      <Form.Item
        {...formItemLayout}
        label="Transaction Fee"
        name="transactionFee"
        initialValue="average"
        rules={[{ required: true }]}
      >
        <Radio.Group size="large" onChange={onChangeSpeed}>
          <Radio.Button value="slow">Slow</Radio.Button>
          <Radio.Button value="average">Average</Radio.Button>
          <Radio.Button value="fast">Fast</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item hidden={true} name="gasPrice" initialValue={baseGasPrice}>
        <Input></Input>
      </Form.Item>

      <Form.Item hidden={true} name="gasLimit" initialValue={baseGasLimit}>
        <Input></Input>
      </Form.Item>
    </Fragment>
  );
};
