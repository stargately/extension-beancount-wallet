import { RouteConfig } from "react-router-config";
import { Greetings } from "../Greetings";
import { CreatePassword } from "../CreatePassword";
import { Unlock } from "../Unlock";
import { Dashboard } from "../Dashboard";
import { TransferToken } from "../TransferToken";
import { Import } from "../Import";
import { NewAccount } from "../NewAccount";
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
    path: "/dashboard",
    component: Dashboard,
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
    path: "/import",
    component: Import,
    exact: true,
  },
  {
    path: "/newAccount",
    component: NewAccount,
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
