import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";

import localStore from "@/utils/localStore";
import { networks } from "@/config/networks";

import {
  IOTEX_CONTROLLER_STORAGE_RECOIL_STATE,
  IOTEX_CONTROLLER_GET_RECOIL_STATE,
} from "@/constant/iotex";

let memoryObj: Record<string, any> = {};

localStore.get().then((res: any) => {
  memoryObj = { ...memoryObj, ...res };
});

export function getCurrentAccountAddress() {
  const address = memoryObj["App.Account.Address"] as string;
  // TODO: need fix
  return address;
}
export function getCurrentNetworkUri() {
  return networks.default[memoryObj["App.Network.Index"] || 0].uri;
}

async function update(req: any, res: any) {
  const { params } = req;
  const originData = (await localStore.get()) as any;
  memoryObj = { ...originData, ...params };
  localStore.set(memoryObj);
  res.result = "OK";
}

async function get(_: any, res: any) {
  res.result = await localStore.get();
}

export function createRecoilStateMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_STORAGE_RECOIL_STATE]: createAsyncMiddleware(update),
    [IOTEX_CONTROLLER_GET_RECOIL_STATE]: createAsyncMiddleware(get),
  });
}
