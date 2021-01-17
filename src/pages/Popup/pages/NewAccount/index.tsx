import React from "react";
import { useSetRecoilState } from "recoil";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import querystring from "querystring";

import { defaultPostman } from "@/pages/Popup/postman";
import { accountsList } from "@/recoil";
import { NewAccount as AccountForm } from "./NewAccount";

type FormValues = {
  name: string;
  privateKey: string;
};

export const NewAccount: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const qs = querystring.parse(location.search.slice(1));
  const setAccounts = useSetRecoilState(accountsList);
  const onFinish = async (values: FormValues) => {
    await defaultPostman.createAccount(values.name, values.privateKey);
    const _accounts = await defaultPostman.getAccounts();
    setAccounts(_accounts);
    history.push("/dashboard");
  };
  return (
    <Container>
      <AccountForm
        onFinish={onFinish}
        mode={qs.mode as "create" | "import"}
      ></AccountForm>
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
