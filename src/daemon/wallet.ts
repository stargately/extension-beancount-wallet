import { HandlerGroup } from "./agent";
import { walletSingleton } from "../wallet-core";

export const CREATE_PASSWORD = "APP.CREATE_PASSWORD";
export const WALLET_UNLOCK = "APP.WALLET_UNLOCK";

export default {
  [CREATE_PASSWORD]: (req, cb) => {
    const { payload } = req;
    const address = walletSingleton.createAccount(payload);
    cb(address);
  },
  [WALLET_UNLOCK]: (req, cb) => {
    const { payload } = req;
    const isOK = walletSingleton.unlock(payload);
    cb(isOK);
  },
} as HandlerGroup;
