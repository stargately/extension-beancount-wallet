import React from "react";
import Form from "antd/lib/form";
import { Link } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { AssetSelect } from "./AssetSelect";
import { TransactionFee } from "./TransactionFee";
import { Amount } from "./Amount";
import { AddRecipient } from "./AddRecipient";

export const TransferTokenForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Container>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => {
          console.log(form.getFieldsValue());
        }}
      >
        <StyledRow>
          <H3>Send Tokens</H3>
          <Link to={"/"}>Cancel</Link>
        </StyledRow>

        <AddRecipient />

        <AssetSelect />

        <Amount />

        <TransactionFee form={form} />

        <Form.Item>
          <StyledRow>
            <Button type="dashed" size="large">
              Cancel
            </Button>

            <Button type="default" htmlType="submit" size="large">
              Next
            </Button>
          </StyledRow>
        </Form.Item>
      </Form>
    </Container>
  );
};

const H3 = styled("h3", {
  margin: 0,
});

const StyledRow = styled(Row, ({ $theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${$theme.sizing[2]} 0`,
}));
const Container = styled("div", {
  textAlign: "left",
  padding: "16px",
});
