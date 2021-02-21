import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { Envelop } from "iotex-antenna/lib/action/envelop";

import { walletSingleton } from "@/wallet-core/wallet-core";
import {
  IOTEX_SIGNER_GET_ACCOUNT,
  IOTEX_SIGNER_GET_ACCOUNTS,
  IOTEX_SIGNER_SIGN_AND_SEND,
  IOTEX_SIGNER_SIGN_MESSAGE,
} from "@/constant/iotex";

import { actionsSigner } from "../../libs/antenna-action-signer";

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
  const params = req.params as string;
  const buf = Uint8Array.from(Buffer.from(params, "hex"));
  const envelop = Envelop.deserialize(buf);

  await actionsSigner.waitingConfirm(req.id, envelop);
  res.result = await actionsSigner.signAndSend(envelop);
}

async function signMessage() {
  throw new Error("not implement");
}
