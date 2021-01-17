import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";

import { defaultPostman } from "@/pages/Popup/postman";

import { accountsList, accountAddress } from "@/recoil";
import { useRefreshWallet } from "@/hooks";
import { AccountsOverlay as Overlay } from "./AccountsOverlay";

export const AccountsOverlay = () => {
  const history = useHistory();
  const accounts = useRecoilValue(accountsList);
  const [address, setAddress] = useRecoilState(accountAddress);
  const refreshWallet = useRefreshWallet();

  const onCreateAccount = useCallback(async () => {
    history.push("/newAccount");
  }, []);

  const onImportAccount = useCallback(() => {
    history.push("/newAccount?mode=import");
  }, []);

  const onLock = async () => {
    await defaultPostman.walletLock();
    refreshWallet();
    history.push("/");
  };

  const onInfoHelp = useCallback(() => {
    history.push("/about");
  }, []);

  return (
    <React.Fragment>
      <Overlay
        accounts={accounts}
        address={address}
        onAddAccount={onCreateAccount}
        onClickAccount={setAddress}
        onLock={onLock}
        onImportAccount={onImportAccount}
        onInfoHelp={onInfoHelp}
      ></Overlay>
    </React.Fragment>
  );
};
