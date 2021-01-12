import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";

import { defaultPostman } from "@/pages/Popup/postman";
import { accountsList } from "@/recoil";
import { ImportAccountForm } from "./ImportAccountForm";

type FormValues = {
  key: string;
};

export const ImportAccount: React.FC = () => {
  const history = useHistory();
  const [accounts, setAccounts] = useRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await defaultPostman.createAccount(
      `IoTeX account ${accounts.length}`,
      values.key
    );
    const _accounts = await defaultPostman.getAccounts();
    setAccounts(_accounts);
    history.push("/account");
  };
  return (
    <Container>
      <ImportAccountForm onFinish={onFinish}></ImportAccountForm>
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
