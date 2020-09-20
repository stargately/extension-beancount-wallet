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
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={() => {
          console.log("submitted");
        }}
      >
        <StyledRow>
          <H3>Send Tokens</H3>
          <Link to={"/"}>Cancel</Link>
        </StyledRow>

        <AddRecipient />

        <AssetSelect />

        <Amount />

        <TransactionFee />

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
    </div>
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
