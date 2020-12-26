import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { Space, Button, Row, Col } from "antd";

type Props = {
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const ConfirmTransactionComponent = function (props: Props) {
  return (
    <Container>
      <Title>Action Signing</Title>
      <Content>
        <Row>
          <Col>Amount</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>From Address</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>To Contract</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>Method</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>Gas Limit</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>Gas Price</Col>
          <Col>1 IOTX</Col>
        </Row>
        <Row>
          <Col>Data</Col>
          <Col>1 IOTX</Col>
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
