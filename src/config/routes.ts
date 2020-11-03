import { RouteConfig } from "react-router-config";
import { Greetings } from "../components/Greetings";
import { CreatePassword } from "../components/CreatePassword";
import { Unlock } from "../components/Unlock";
import { AccountDetail } from "../components/AccountDetail";
import { TransferToken } from "../components/TransferToken";
import { ImportKey } from "../components/ImportKey";
import { ImportAccount } from "../components/ImportAccount";
import { ActivityDetail } from "../components/ActivityDetail";

const RouteConfig: RouteConfig[] = [
  {
    path: "/unlock",
    component: Unlock,
    exact: true,
  },
  {
    path: "/createPassword",
    component: CreatePassword,
    exact: true,
  },
  {
    path: "/account",
    component: AccountDetail,
    exact: true,
  },
  {
    path: "/",
    component: Greetings,
    exact: true,
  },
  {
    path: "/transfer",
    component: TransferToken,
    exact: true,
  },
  {
    path: "/importKey",
    component: ImportKey,
    exact: true,
  },
  {
    path: "/importAccount",
    component: ImportAccount,
    exact: true,
  },
  {
    path: "/activity/:id",
    component: ActivityDetail,
    exact: true,
  },
];

export default RouteConfig;
