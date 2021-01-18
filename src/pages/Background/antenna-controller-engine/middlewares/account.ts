import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { walletSingleton } from "@/wallet-core";

import {
  IOTEX_CONTROLLER_CREATE_ACCOUNT,
  IOTEX_CONTROLLER_DELETE_ACCOUNT,
  IOTEX_CONTROLLER_EDIT_ACCOUNT,
  IOTEX_CONTROLLER_CREATE_PASSWORD,
  IOTEX_CONTROLLER_GET_ACCOUNTS,
  IOTEX_CONTROLLER_VERIFY_PASSWORD,
} from "@/constant/iotex";

async function createPassword(req: any, res: any) {
  const { password, privateKey } = req.params;
  await walletSingleton.createKeyringController(password, privateKey);
  res.result = "OK";
}

async function createAccount(req: any, res: any) {
  const { name, privateKey } = req.params;
  const addr = await walletSingleton.createAccount(name, privateKey);
  res.result = addr;
}

async function editAccount(req: any, res: any) {
  const { name, address } = req.params;
  walletSingleton.editAccount(address, name);
  res.result = "OK";
}

async function deleteAccount(req: any, res: any) {
  const { address } = req.params;
  await walletSingleton.deleteAccount(address);
  res.result = "OK";
}

async function getAccounts(_: any, res: any) {
  const accounts = walletSingleton.getAccounts();
  res.result = accounts;
}

async function verifyPassword(req: any, res: any) {
  const { password } = req.params;
  res.result = await walletSingleton.verifyPassword(password);
}

export function createAccountMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_CREATE_ACCOUNT]: createAsyncMiddleware(createAccount),
    [IOTEX_CONTROLLER_DELETE_ACCOUNT]: createAsyncMiddleware(deleteAccount),
    [IOTEX_CONTROLLER_CREATE_PASSWORD]: createAsyncMiddleware(createPassword),
    [IOTEX_CONTROLLER_GET_ACCOUNTS]: createAsyncMiddleware(getAccounts),
    [IOTEX_CONTROLLER_VERIFY_PASSWORD]: createAsyncMiddleware(verifyPassword),
    [IOTEX_CONTROLLER_EDIT_ACCOUNT]: createAsyncMiddleware(editAccount),
  });
}
