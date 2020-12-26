import { mergeMiddleware } from "json-rpc-engine";

import { createAccountMiddleware } from "./account";
import { createWalletMiddleware } from "./wallet";
import { createRecoilStateMiddleware } from "./recoilState";
import { createTxMiddleware } from "./tx";

export function createAntennaControllerMiddleware() {
  return mergeMiddleware([
    createAccountMiddleware(),
    createWalletMiddleware(),
    createRecoilStateMiddleware(),
    createTxMiddleware(),
  ]);
}
