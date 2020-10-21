import { HandlerGroup } from "./agent";
import { getWalletSingleton } from "../wallet-core";

export const CREATE_PASSWORD = "APP.CREATE_PASSWORD";
export const WALLET_UNLOCK = "APP.WALLET_UNLOCK";
export const WALLET_LOCK = "APP.WALLET_LOCK";
export const WALLET_INITIIATED = "APP.WALLET_INITIIATED";
export const WALLET_LOCKED = "APP.WALLET_LOCKED";
export const WALLET_UNLOCKED = "APP.WALLET_UNLOCKED";
export const WALLET_VERIFY_PASSWD = "WALLET_VERIFY_PASSWD";

export default {
  [CREATE_PASSWORD]: async (req, cb) => {
    const { payload } = req;
    await getWalletSingleton().createNewVaultAndKeychain(payload);
    cb();
  },
  [WALLET_UNLOCK]: async (req, cb) => {
    const { payload } = req;
    const isOK = await getWalletSingleton().unlock(payload);
    cb(isOK);
  },
  [WALLET_LOCK]: async (_, cb) => {
    await getWalletSingleton().lock();
    cb();
  },
  [WALLET_LOCKED]: (_, cb) => {
    cb(getWalletSingleton().isLocked);
  },
  [WALLET_INITIIATED]: (_, cb) => {
    cb(getWalletSingleton().isInitiated);
  },
  [WALLET_VERIFY_PASSWD]: async (req, cb) => {
    const { payload } = req;
    const isOK = await getWalletSingleton().verifyPassword(payload);
    cb(isOK);
  },
} as HandlerGroup;
