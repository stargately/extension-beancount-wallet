import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { Row, Col, Divider } from "antd";

type Props = {
  tokens: any[];
};

export const XRC20Tokens: React.FC<Props> = ({ tokens }) => {
  if (tokens.length === 0) {
    return <Container>No Assets</Container>;
  }

  return (
    <Container>
      {tokens.map((token) => {
        return (
          <div key={token.name}>
            <Row justify="space-between" align="middle">
              <Col>{token.name}</Col>
              <Col>{token.balance / 10 ** token.decimals}</Col>
            </Row>
            <Divider></Divider>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  padding: "10px",
});
