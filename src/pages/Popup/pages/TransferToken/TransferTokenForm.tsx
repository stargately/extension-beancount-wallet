import React from "react";
import Form from "antd/lib/form";
import { styled } from "onefx/lib/styletron-react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import { AssetSelect } from "./AssetSelect";
import { TransactionFeeInput } from "./TransactionFeeInput";
import { AmountInput } from "./AmountInput";
import { RecipienInput } from "./RecipienInput";

type Props = {
  onFinish?: (values: any) => void;
  onCancel?: (values: any) => void;
};

export const TransferTokenForm: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  return (
    <Container>
      <Form form={form} name="form" onFinish={props.onFinish}>
        <RecipienInput />
        <AssetSelect />
        <AmountInput />
        <TransactionFeeInput form={form} />
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit" size="large">
                Next
              </Button>
            </Col>
            <Col>
              <Button type="dashed" size="large" onClick={props.onCancel}>
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
  textAlign: "left",
  padding: "16px",
});
