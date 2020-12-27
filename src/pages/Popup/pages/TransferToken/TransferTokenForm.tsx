import React from "react";
import Form from "antd/lib/form";
import { useHistory } from "react-router-dom";
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
};

export const TransferTokenForm: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onGoBack = React.useCallback(() => {
    history.goBack();
  }, []);

  return (
    <Container>
      <Header>
        <Row justify="space-between">
          <Col>
            <Title>Send Tokens</Title>
          </Col>
          <Col>
            <Button type="text" onClick={onGoBack}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Header>
      <Form form={form} name="form" onFinish={props.onFinish}>
        <RecipienInput />
        <AssetSelect />
        <AmountInput />
        <TransactionFeeInput form={form} />
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Button type="dashed" size="large" onClick={onGoBack}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button type="default" htmlType="submit" size="large">
                Next
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Header = styled("div", {
  marginBottom: "10px",
});

const Title = styled("h3", {
  margin: 0,
});

const Container = styled("div", {
  textAlign: "left",
  padding: "16px",
});
