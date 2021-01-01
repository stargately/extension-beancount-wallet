import React from "react";
import { AccountMetaObserver } from "./account-meta";
import { AccountActionsObserver } from "./account-actions";

export function Observer() {
  return (
    <React.Fragment>
      <AccountMetaObserver></AccountMetaObserver>
      <AccountActionsObserver></AccountActionsObserver>
    </React.Fragment>
  );
}
