import { RouteConfig } from "react-router-config";
import { Greetings } from "../components/Greetings";
import { CreatePassword } from "../components/CreatePassword";
import { Unlock } from "../components/Unlock";
import { AccountDetail } from "../components/AccountDetail";
import { TransferToken } from "../components/TransferToken";
import { ImportKey } from "../components/ImportKey";

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
];

export default RouteConfig;
