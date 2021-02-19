import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { withRouter } from "react-router-dom";
import Button from "antd/lib/button";
import { Logo } from "@/styles/logo";
import { fonts } from "@/styles/style-font";

export const Welcome = withRouter(({ history }) => {
  return (
    <Container>
      <Logo />
      <Title
        style={{
          textAlign: "center",
          marginTop: "22px",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "33px",
          marginBottom: "22px",
        }}
      >
        Welcome to <br />
        ioPay Wallet for Chrome
      </Title>
      <Paragraph>
        Connecting you to IoTeX and the
        <br />
        Decentralized Web.
        <br />
        We’re happy to see you.
      </Paragraph>
      <div
        style={{
          marginTop: "157px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="large"
          onClick={() => {
            history.push("/import");
          }}
        >
          Import
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            history.push("/createPassword");
          }}
        >
          Create
        </Button>
      </div>
    </Container>
  );
});

const Container = styled("div", {
  padding: "16px",
});

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});

const Paragraph = styled("div", {
  ...fonts.normal,
  textAlign: "center",
  lineHeight: "22px",
});
