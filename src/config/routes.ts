import Greetings from "../components/Greetings";
import CreateAccount from "../components/CreateAccount";
import Unlock from "../components/Unlock";

export interface IRouteConfig {
  path: string;
  component: Function;
  routes?: [];
}

const RouteConfig: IRouteConfig[] = [
  {
    path: "/unlock",
    component: Unlock,
  },
  {
    path: "/createAccount",
    component: CreateAccount,
  },
  {
    path: "/",
    component: Greetings,
  },
];

export default RouteConfig;
