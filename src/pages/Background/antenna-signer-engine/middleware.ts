import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { Envelop } from "iotex-antenna/lib/action/envelop";

import { walletSingleton } from "@/wallet-core/wallet-core";
import { AntennaAccount } from "@/wallet-core/antenna-account";
import {
  IOTEX_SIGNER_GET_ACCOUNT,
  IOTEX_SIGNER_GET_ACCOUNTS,
  IOTEX_SIGNER_SIGN_AND_SEND,
  IOTEX_SIGNER_SIGN_MESSAGE,
} from "@/constant/iotex";
import { AntennaMethod } from "./method";

export function createAntennaSignerMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_SIGNER_GET_ACCOUNT]: createAsyncMiddleware(getAccount),
    [IOTEX_SIGNER_GET_ACCOUNTS]: createAsyncMiddleware(getAccounts),
    [IOTEX_SIGNER_SIGN_AND_SEND]: createAsyncMiddleware(signAndSend),
    [IOTEX_SIGNER_SIGN_MESSAGE]: createAsyncMiddleware(signMessage),
  });
}

const getAccount = async function (req: any, res: any) {
  const address = req.params;
  const account = walletSingleton.getAccount();
  if (!account) {
    throw new Error(`Can't find account about ${address}`);
  }
  res.result = account;
};

async function getAccounts(_: any, res: any) {
  res.result = walletSingleton.getAccounts();
}

async function signAndSend(req: any, res: any) {
  const accounts = walletSingleton.accounts as AntennaAccount[];
  // TODO: link current account
  const method = new AntennaMethod(
    accounts[0].antenna.iotx,
    accounts[0].antenna.iotx.accounts[0]
  );
  const params = req.params as string;
  const buf = Uint8Array.from(Buffer.from(params, "hex"));
  const envelop = Envelop.deserialize(buf);
  res.result = await method.sendAction(envelop);
}

async function signMessage() {
  throw new Error("not implement");
}
