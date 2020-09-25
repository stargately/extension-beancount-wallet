import React from "react";
import { styled } from "onefx/lib/styletron-react";

import Button from "antd/lib/button";
import { Logo } from "../../styles/logo";
import { CommonMargin } from "../../styles/common-margin";
import { fonts } from "../../styles/style-font";

export const Welcome: React.FC = () => {
  return (
    <>
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
            // TODO
          }}
        >
          Create
        </Button>
      </div>
    </>
  );
};

const Title = styled("h1", {
  ...fonts.h1,
  textAlign: "center",
});

const Paragraph = styled("div", {
  ...fonts.normal,
  textAlign: "center",
});
