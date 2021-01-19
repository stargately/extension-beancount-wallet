import React from "react";
import { Header as DashboardHeader } from "./Header";
import { Networks } from "./Networks";
import { AccountsOverlay } from "../AccountsOverlay";

export const Header = () => {
  return (
    <DashboardHeader
      networks={<Networks />}
      overlay={<AccountsOverlay />}
    ></DashboardHeader>
  );
};
