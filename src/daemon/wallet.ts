import { HandlerGroup } from "./agent";
import { walletSingleton } from "../wallet-core";

export const CREATE_PASSWORD = "APP.CREATE_PASSWORD";
export const WALLET_UNLOCK = "APP.WALLET_UNLOCK";
export const WALLET_LOCK = "APP.WALLET_LOCK";
export const WALLET_INITIIATED = "APP.WALLET_INITIIATED";
export const WALLET_LOCKED = "APP.WALLET_LOCKED";
export const WALLET_UNLOCKED = "APP.WALLET_UNLOCKED";

export default {
  [CREATE_PASSWORD]: async (req, cb) => {
    const { payload } = req;
    console.log("CREATE_PASSWORD", payload);
    await walletSingleton.createKeyringController(payload);
    cb();
  },
  [WALLET_UNLOCK]: (req, cb) => {
    const { payload } = req;
    const isOK = walletSingleton.unlock(payload);
    cb(isOK);
  },
  [WALLET_LOCK]: (_, cb) => {
    walletSingleton.lock();
    cb();
  },
  [WALLET_LOCKED]: (_, cb) => {
    cb(walletSingleton.isLocked);
  },
  [WALLET_INITIIATED]: (_, cb) => {
    cb(walletSingleton.isInitiated);
  },
} as HandlerGroup;
