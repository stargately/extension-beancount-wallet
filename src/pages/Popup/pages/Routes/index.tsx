import React from "react";

import { HashRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { WrapThemeProvider as ThemeProvider } from "@/styles/theme-provider";

import routeConfig from "./routes";
import "../../../../translations/i18n";

const Routes = () => {
  return (
    <ThemeProvider>
      <Router>{renderRoutes(routeConfig)}</Router>
    </ThemeProvider>
  );
};

export default Routes;
