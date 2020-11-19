import { HandlerGroup } from "./agent";
import { walletSingleton } from "../wallet-core";

export const CREATE_PASSWORD = "APP.CREATE_PASSWORD";
export const WALLET_UNLOCK = "APP.WALLET_UNLOCK";
export const WALLET_LOCK = "APP.WALLET_LOCK";
export const WALLET_INITIIATED = "APP.WALLET_INITIIATED";
export const WALLET_LOCKED = "APP.WALLET_LOCKED";
export const WALLET_UNLOCKED = "APP.WALLET_UNLOCKED";
export const WALLET_VERIFY_PASSWD = "WALLET_VERIFY_PASSWD";
export const WALLET_GET_ACCOUNTS = "WALLET_GET_ACCOUNTS";
export const WALLET_GET_ACCOUNT_META = "WALLET_GET_ACCOUNT_META";
export const WALLET_CREATE_ACCOUNT = "WALLET_CREATE_ACCOUNT";
export const WALLET_TRANSFER_TOKEN = "APP.WALLET_TRANSFER_TOKEN";
export const WALLET_ACTIONS = "APP.WALLET_ACTIONS";
export const WALLET_ACTION_DETAIL = "APP.WALLET_ACTION_DETAIL";
export const WALLET_REMOVE_ACCOUNT = "APP.WALLET_REMOVE_ACCOUNT";

export default {
  [CREATE_PASSWORD]: async (req, cb) => {
    const { payload } = req;
    const { password, privateKey } = payload;
    await walletSingleton.createKeyringController(password, privateKey);
    cb();
  },
  [WALLET_UNLOCK]: async (req, cb) => {
    const { payload } = req;
    const isOK = await walletSingleton.unlock(payload);
    cb(isOK);
  },
  [WALLET_LOCK]: async (_, cb) => {
    await walletSingleton.lock();
    cb();
  },
  [WALLET_LOCKED]: (_, cb) => {
    cb(walletSingleton.isLocked);
  },
  [WALLET_INITIIATED]: (_, cb) => {
    cb(walletSingleton.isInitiated);
  },
  [WALLET_VERIFY_PASSWD]: async (req, cb) => {
    const { payload } = req;
    const isOK = await walletSingleton.verifyPassword(payload);
    cb(isOK);
  },
  [WALLET_GET_ACCOUNTS]: async (_, cb) => {
    const accounts = await walletSingleton.getAccounts();
    cb(accounts);
  },
  [WALLET_CREATE_ACCOUNT]: async (req, cb) => {
    const { payload } = req;
    const { name, privateKey } = payload;
    let addr;
    try {
      addr = await walletSingleton.createAccount(name, privateKey);
    } catch (e) {
      cb(e);
    }
    cb(addr);
  },
  [WALLET_GET_ACCOUNT_META]: async (req, cb) => {
    const { payload } = req;
    const { address, providerUrl } = payload;
    const acc = await walletSingleton.getAccount(address);
    providerUrl && acc?.setProvider(providerUrl);
    const accountMeta = await walletSingleton.getAccountMeta(address);
    cb(accountMeta);
  },
  [WALLET_TRANSFER_TOKEN]: async (req, cb) => {
    const { payload } = req;
    try {
      await walletSingleton.transferToken({
        from: payload.from,
        url: payload.url,
        to: payload.to,
        amount: payload.amount,
        gasPrice: payload.gasPrice,
        gasLimit: payload.gasLimit,
      });
    } catch (e) {
      cb(e);
    }
    cb();
  },
  [WALLET_ACTIONS]: async (req, cb) => {
    const { payload } = req;
    const { address, providerUrl, start, count } = payload;
    const acc = await walletSingleton.getAccount(address);
    providerUrl && acc?.setProvider(providerUrl);
    const actions = await walletSingleton.getActions(address, start, count);
    cb(actions);
  },
  [WALLET_ACTION_DETAIL]: async (req, cb) => {
    const { payload } = req;
    const { address, providerUrl, actionHash } = payload;
    const acc = await walletSingleton.getAccount(address);
    providerUrl && acc?.setProvider(providerUrl);
    const actions = await walletSingleton.getActionsByHash(address, actionHash);
    cb(actions);
  },
  [WALLET_REMOVE_ACCOUNT]: async (req, cb) => {
    const { payload } = req;
    const { address } = payload;
    await walletSingleton.deleteAccount(address);
    cb();
  },
} as HandlerGroup;
