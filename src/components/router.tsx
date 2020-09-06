import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routeConfig, { IRouteConfig } from "../config/routes";

const BasicRoute = (route: IRouteConfig) => {
  return (
    <Route
      path={route.path}
      render={(props) =>
        React.createElement(route.component, { ...props, routes: route.routes })
      }
    />
  );
};

const RouterConfig = () => {
  return (
    <Router>
      <Switch>
        {routeConfig.map((route, i) => (
          <BasicRoute key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
};

export default RouterConfig;
