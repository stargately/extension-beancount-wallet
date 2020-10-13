import React, { useContext } from "react";
import { styled } from "onefx/lib/styletron-react";
import { withRouter } from "react-router";
import Button from "antd/lib/button";
import { Logo } from "../../styles/logo";
import { CommonMargin } from "../../styles/common-margin";
import { fonts } from "../../styles/style-font";
import { StateContext } from "../App/context";

export const Welcome = withRouter(({ history }) => {
  const { state, setState } = useContext(StateContext);

  return (
    <Container>
      <Logo />
      <CommonMargin />
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Welcome to <br />
        Beancount Wallet
      </Title>
      <CommonMargin />
      <Paragraph>
        Connecting you to IoTeX and the
        <br />
        Decentralized Web.
        <br />
        We’re happy to see you.
      </Paragraph>
      <div>
        <div>{state.count}</div>
        <button
          onClick={() => {
            setState({ count: state.count + 1 });
          }}
        >
          add
        </button>
      </div>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="large"
          onClick={() => {
            // TODO
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
});
