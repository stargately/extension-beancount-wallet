import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import { IOTEX_CONTROLLER_XRC20 } from "@/constant/iotex";
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

export function createXrc20TokensMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_XRC20]: createAsyncMiddleware(xrc20list),
  });
}
