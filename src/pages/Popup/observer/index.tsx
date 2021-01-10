import React from "react";
import { AccountMetaObserver } from "./account-meta";
import { AccountActionsObserver } from "./account-actions";
import { AccountTokensObserver } from "./tokens";

export function Observer() {
  return (
    <React.Fragment>
      <AccountMetaObserver></AccountMetaObserver>
      <AccountActionsObserver></AccountActionsObserver>
      <AccountTokensObserver></AccountTokensObserver>
    </React.Fragment>
  );
}
