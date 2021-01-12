import { RouteConfig } from "react-router-config";
import { Greetings } from "../Greetings";
import { CreatePassword } from "../CreatePassword";
import { Unlock } from "../Unlock";
import { AccountDetail } from "../AccountDetail";
import { TransferToken } from "../TransferToken";
import { ImportKey } from "../ImportKey";
import { ImportAccount } from "../ImportAccount";
import { ActivityDetail } from "../ActivityDetail";
import { About } from "../About";
import { ConfirmTransaction } from "../ConfirmTransaction";

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
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/confirm-transaction",
    component: ConfirmTransaction,
    exact: true,
  },
];

export default RouteConfig;
