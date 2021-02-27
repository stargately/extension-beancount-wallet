import React from "react";
import Select from "antd/lib/select";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import Form, { FormInstance } from "antd/lib/form";
import { formItemLayout } from "./formStyles";

const { Option } = Select;

type Props = {
  form: FormInstance;
};

export const AssetSelect: React.FC<Props> = (props) => {
  const onChange = (value: string) => {
    props.form.setFields([
      {
        name: "asset",
        value,
      },
    ]);
  };
  return (
    <Form.Item
      {...formItemLayout}
      label="Asset"
      name="asset"
      initialValue="IOTX"
    >
      <Select size="large" onChange={onChange}>
        <Option value="IOTX">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>IoTeX</div>
            </Col>
          </Row>
        </Option>
        <Option value="ioETH">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioETH</div>
            </Col>
          </Row>
        </Option>
        <Option value="ioPAXG">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioPAXG</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="ioBUSD">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioBUSD</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="ioWBTC">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioWBTC</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="ioUNI">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioUNI</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="METX">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>METX</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="SDI">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>SDI</div>{" "}
            </Col>
          </Row>
        </Option>
        <Option value="ioUSDT">
          <Row gutter={8}>
            {" "}
            <Col>
              <div>ioUSDT</div>{" "}
            </Col>
          </Row>
        </Option>
      </Select>
    </Form.Item>
  );
};
