import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { Space, Button, Row, Col } from "antd";

type Props = {
  amount: string;
  toContract: string;
  gasPrice: string;
  gasLimit: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const ConfirmTransactionComponent = function (props: Props) {
  return (
    <Container>
      <Title>Action Signing</Title>
      <Content>
        <Row>
          <Col span={8}>Amount</Col>
          <Col>{props.amount}</Col>
        </Row>
        <Row>
          <Col span={8}>To Contract</Col>
          <Col>{props.toContract}</Col>
        </Row>
        <Row>
          <Col span={8}>Gas Limit</Col>
          <Col>{props.gasLimit}</Col>
        </Row>
        <Row>
          <Col span={8}>Gas Price</Col>
          <Col>{props.gasPrice}</Col>
        </Row>
      </Content>
      <Space>
        <Button type="primary" onClick={props.onConfirm}>
          Yes, Sign Action
        </Button>
        <Button onClick={props.onCancel}>No, Cancel</Button>
      </Space>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
});

const Title = styled("div", {
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "20px",
});

const Content = styled("div", {
  backgroundColor: "#eee",
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
});
