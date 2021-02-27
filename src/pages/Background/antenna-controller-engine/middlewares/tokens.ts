import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import {
  IOTEX_CONTROLLER_XRC20,
  IOTEX_CONTROLLER_XRC20_TRANSFER,
} from "@/constant/iotex";
import { walletSingleton } from "@/wallet-core";
import {
  getCurrentAccountAddress,
  getCurrentNetworkUri,
  getXrc20TokenAddressList,
} from "./recoilState";

async function xrc20list(_: any, res: any) {
  res.result = await walletSingleton.xrc20List({
    address: getCurrentAccountAddress(),
    providerUrl: getCurrentNetworkUri(),
    xrc20: getXrc20TokenAddressList(),
  });
}

async function xrc20Transfer(req: any, res: any) {
  const { params } = req;
  const xrc20list = getXrc20TokenAddressList();
  const { asset } = params;
  const meta = xrc20list.filter((e) => e.name === asset);
  if (meta.length !== 1) {
    throw new Error("can find XRC20");
  }

  await walletSingleton.xrc20Transfer({
    from: getCurrentAccountAddress(),
    to: params.to,
    value: params.amount,
    gasPrice: params.gasPrice,
    gasLimit: params.gasLimit,
    providerUrl: getCurrentNetworkUri(),
    xrc20Address: meta[0].url,
  });
  res.result = "OK";
}

export function createXrc20TokensMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_XRC20_TRANSFER]: createAsyncMiddleware(xrc20Transfer),
    [IOTEX_CONTROLLER_XRC20]: createAsyncMiddleware(xrc20list),
  });
}
