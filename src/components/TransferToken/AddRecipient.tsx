import React from "react";
import Form, { RuleObject } from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import { Link } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import { validateAddress } from "iotex-antenna/lib/account/utils";

export const AddRecipient: React.FC = () => {
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
          <H3>Add Recipient</H3>
          <Link to={"/"}>Cancel</Link>
        </StyledRow>
        <Form.Item
          name="recipient"
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
