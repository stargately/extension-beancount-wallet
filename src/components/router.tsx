import React from "react";

import { HashRouter as Router } from "react-router-dom";

import { renderRoutes } from "react-router-config";
import routeConfig from "../config/routes";

// TODO(di) add route guard suprot

const RouterConfig = () => {
  return <Router>{renderRoutes(routeConfig)}</Router>;
};

export default RouterConfig;
