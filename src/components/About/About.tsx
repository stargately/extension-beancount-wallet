import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const About = function () {
  const history = useHistory();
  const onBack = React.useCallback(() => {
    history.goBack();
  }, []);
  return (
    <Container>
      <BackArrowButton onClick={onBack}></BackArrowButton>
      <Title>Beancount Wallet Version</Title>
      <Version>8.1.3</Version>
      <Description>
        Beancount Wallet is designed and built in California.
      </Description>
      <Links>
        <a href="https://beancount.io/page/legal/privacy-policy/">
          Privacy Policy
        </a>
        <a href="https://beancount.io/page/legal/terms-of-service/">
          Terms of Use
        </a>
        <a href="https://beancount.io/">Visit our web site</a>
        <a href="https://t.me/beancount">Contact us</a>
      </Links>
    </Container>
  );
};

const Container = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  padding: $theme.sizing[2],
}));

const Title = styled("div", ({ $theme }) => ({
  marginTop: $theme.sizing[5],
  textAlign: "center",
  fontSize: $theme.sizing[4],
}));

const Version = styled("div", ({ $theme }) => ({
  textAlign: "center",
  fontSize: $theme.sizing[3],
  marginTop: $theme.sizing[2],
  marginBottom: $theme.sizing[2],
}));

const Description = styled("div", ({ $theme }) => ({
  color: $theme.colors.black80,
}));

const Links = styled("div", ({ $theme }) => ({
  width: "100%",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  marginTop: $theme.sizing[3],
}));

const BackArrowButton = styled(ArrowLeftOutlined, ({ $theme }) => ({
  fontSize: $theme.sizing[4],
  marginBlock: $theme.sizing[4],
  alignSelf: "flex-start",
  marginLeft: $theme.sizing[2],
  cursor: "pointer",
}));
