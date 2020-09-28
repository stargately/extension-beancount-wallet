import { RouteConfig } from "react-router-config";
import { Greetings } from "../components/Greetings";
import { CreatePassword } from "../components/CreatePassword";
import { Unlock } from "../components/Unlock";
import { AccountDetail } from "../components/AccountDetail";

const RouteConfig: RouteConfig[] = [
  {
    path: "/unlock",
    component: Unlock,
  },
  {
    path: "/createPassword",
    component: CreatePassword,
  },
  {
    path: "/account",
    component: AccountDetail,
  },
  {
    path: "/",
    component: Greetings,
  },
];

export default RouteConfig;
