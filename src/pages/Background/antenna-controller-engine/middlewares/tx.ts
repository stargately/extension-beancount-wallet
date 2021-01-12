import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { walletSingleton } from "@/wallet-core";
import {
  IOTEX_CONTROLLER_TRANSFER_TOKEN,
  IOTEX_CONTROLLER_ACCOUNT_META,
  IOTEX_CONTROLLER_GET_ACTIONS,
  IOTEX_CONTROLLER_QUERY_ACTION,
} from "@/constant/iotex";
import { getCurrentAccountAddress, getCurrentNetworkUri } from "./recoilState";

async function getAccountMeta(_: any, res: any) {
  const acc = walletSingleton.getAccount(getCurrentAccountAddress());
  if (!acc) {
    throw new Error("Can find current account");
  }
  acc.setProvider(getCurrentNetworkUri());
  res.result = await acc.getAccountMeta();
}

async function transferToken(req: any, res: any) {
  const { params } = req;
  const acc = walletSingleton.getAccount(getCurrentAccountAddress());
  if (!acc) {
    throw new Error("Can find current account");
  }
  acc.setProvider(getCurrentNetworkUri());
  await acc.transfer({
    from: getCurrentAccountAddress(),
    to: params.to,
    amount: params.amount,
    gasPrice: params.gasPrice,
    gasLimit: params.gasLimit,
  });
  res.result = "OK";
}

async function getActions(req: any, res: any) {
  const { start, count } = req.params;
  const acc = walletSingleton.getAccount(getCurrentAccountAddress());
  if (!acc) {
    throw new Error("Can find current account");
  }
  acc.setProvider(getCurrentNetworkUri());
  res.result = await acc.getActions(start, count);
}

async function queryAction(req: any, res: any) {
  const { actionHash } = req.params;
  const acc = walletSingleton.getAccount(getCurrentAccountAddress());
  if (!acc) {
    throw new Error("Can find current account");
  }
  acc?.setProvider(getCurrentNetworkUri());
  const { actionInfo } = await acc.getActionByHash(actionHash);
  res.result = actionInfo;
}

export function createTxMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_ACCOUNT_META]: createAsyncMiddleware(getAccountMeta),
    [IOTEX_CONTROLLER_TRANSFER_TOKEN]: createAsyncMiddleware(transferToken),
    [IOTEX_CONTROLLER_GET_ACTIONS]: createAsyncMiddleware(getActions),
    [IOTEX_CONTROLLER_QUERY_ACTION]: createAsyncMiddleware(queryAction),
  });
}
