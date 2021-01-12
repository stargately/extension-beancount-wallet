import { mergeMiddleware } from "json-rpc-engine";

import { createAccountMiddleware } from "./account";
import { createWalletMiddleware } from "./wallet";
import { createRecoilStateMiddleware } from "./recoilState";
import { createTxMiddleware } from "./tx";
import { createSignerMiddleware } from "./signer";
import { createXrc20TokensMiddleware } from "./tokens";

export function createAntennaControllerMiddleware() {
  return mergeMiddleware([
    createAccountMiddleware(),
    createWalletMiddleware(),
    createRecoilStateMiddleware(),
    createTxMiddleware(),
    createSignerMiddleware(),
    createXrc20TokensMiddleware(),
  ]);
}
