import React from "react";
import { Observer } from "@/pages/Popup/observer";
import { Dashboard as DashboardComponent } from "./Dashboard";

export const Dashboard = () => {
  return (
    <React.Fragment>
      <Observer></Observer>
      <DashboardComponent />
    </React.Fragment>
  );
};
