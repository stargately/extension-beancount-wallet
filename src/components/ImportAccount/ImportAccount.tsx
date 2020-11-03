import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";

import { ImportAccountForm } from "./ImportAccountForm";
import { clientSingleton } from "../../daemon/client";
import { accountsList } from "../../recoil";

type FormValues = {
  key: string;
};

export const ImportAccount: React.FC = () => {
  const history = useHistory();
  const [accounts, setAccount] = useRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await clientSingleton.walletCreateAccount(
      `IoTeX account ${accounts.length}`,
      values.key
    );
    const _accounts = await clientSingleton.walletGetAccounts();
    setAccount(_accounts);
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
