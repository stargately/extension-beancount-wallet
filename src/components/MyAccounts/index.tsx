import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { defaultPostman } from "@/pages/Popup/postman";

import { MyAccounts as Account } from "./MyAccounts";
import { accountsList, accountAddress } from "../../recoil";
import { useRefreshWallet } from "../../hooks";

export const MyAccounts = () => {
  const history = useHistory();
  const [accounts, setAccount] = useRecoilState(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);
  const refreshWallet = useRefreshWallet();
  const onCreateAccount = useCallback(async () => {
    await defaultPostman.createAccount(`IoTeX account ${accounts.length}`);
    const _accounts = await defaultPostman.getAccounts();
    setAccount(_accounts);
  }, [accounts]);
  const onLock = async () => {
    await defaultPostman.walletLock();
    refreshWallet();
    history.push("/");
  };
  const onImportAccount = useCallback(() => {
    history.push("/importAccount");
  }, []);
  const onInfoHelp = useCallback(() => {
    history.push("/about");
  }, []);

  return (
    <Account
      accounts={accounts}
      address={address}
      onAddAccount={onCreateAccount}
      onClickAccount={setAddress}
      onLock={onLock}
      onImportAccount={onImportAccount}
      onInfoHelp={onInfoHelp}
    ></Account>
  );
};
