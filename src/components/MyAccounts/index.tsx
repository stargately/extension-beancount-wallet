import React, { useCallback } from "react";
import { useRecoilState } from "recoil";

import { MyAccounts as Account } from "./MyAccounts";
import { accountsList, accountAddress } from "../../recoil";
import { clientSingleton } from "../../daemon/client";

export const MyAccounts = () => {
  const [accounts, setAccount] = useRecoilState(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);
  const onCreateAccount = useCallback(async () => {
    await clientSingleton.walletCreateAccount(
      `IoTeX account ${accounts.length + 1}`
    );
    const _accounts = await clientSingleton.walletGetAccounts();
    setAccount(_accounts);
  }, []);

  return (
    <Account
      accounts={accounts}
      address={address}
      onAddAccount={onCreateAccount}
      onClickAccount={setAddress}
    ></Account>
  );
};
