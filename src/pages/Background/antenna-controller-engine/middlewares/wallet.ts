import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { walletSingleton } from "@/wallet-core";

import {
  IOTEX_CONTROLLER_LOCK,
  IOTEX_CONTROLLER_UNLOCK,
  IOTEX_CONTROLLER_LOCKED,
  IOTEX_CONTROLLER_INITED,
} from "@/constant/iotex";

async function lock(_: any, res: any) {
  await walletSingleton.lock();
  res.result = "OK";
}

async function unlock(req: any, res: any) {
  const { password } = req.params;
  const isOK = await walletSingleton.unlock(password);
  res.result = isOK;
}

async function locked(_: any, res: any) {
  res.result = walletSingleton.isLocked;
}

async function inited(_: any, res: any) {
  res.result = walletSingleton.isInitiated;
}

export function createWalletMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_LOCK]: createAsyncMiddleware(lock),
    [IOTEX_CONTROLLER_UNLOCK]: createAsyncMiddleware(unlock),
    [IOTEX_CONTROLLER_LOCKED]: createAsyncMiddleware(locked),
    [IOTEX_CONTROLLER_INITED]: createAsyncMiddleware(inited),
  });
}
