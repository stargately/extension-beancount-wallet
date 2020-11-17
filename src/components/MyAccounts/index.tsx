import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { MyAccounts as Account } from "./MyAccounts";
import { accountsList, accountAddress } from "../../recoil";
import { clientSingleton } from "../../daemon/client";
import { useRefreshWallet } from "../../hooks";

export const MyAccounts = () => {
  const history = useHistory();
  const [accounts, setAccount] = useRecoilState(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);
  const refreshWallet = useRefreshWallet();
  const onCreateAccount = useCallback(async () => {
    await clientSingleton.walletCreateAccount(
      `IoTeX account ${accounts.length}`
    );
    const _accounts = await clientSingleton.walletGetAccounts();
    setAccount(_accounts);
  }, [accounts]);
  const onLock = async () => {
    await clientSingleton.walletLock();
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
