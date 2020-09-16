import React from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { renderRoutes } from "react-router-config";
import routeConfig from "../config/routes";

// TODO(di) add route guard suprot

const RouterConfig = () => {
  return (
    <Router>
      <Switch>{renderRoutes(routeConfig)}</Switch>
    </Router>
  );
};

export default RouterConfig;
