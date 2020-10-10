import React from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import Avatar from "antd/lib/avatar/avatar";
import { formItemLayout } from "./formStyles";

const { Option } = Select;

export const AssetSelect: React.FC = () => {
  return (
    <Form.Item
      {...formItemLayout}
      label="Asset"
      name="asset"
      initialValue={"IOTX"}
    >
      <Select size={"large"}>
        <Option value="IOTX">
          <Row gutter={8}>
            <Col>
              <Avatar
                size="small"
                src="https://beancount-io.b-cdn.net/iotex.png"
              />
            </Col>
            <Col>
              <div>IoTeX</div>
            </Col>
          </Row>
        </Option>
      </Select>
    </Form.Item>
  );
};
