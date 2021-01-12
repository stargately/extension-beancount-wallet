import {
  createAsyncMiddleware,
  createScaffoldMiddleware,
} from "json-rpc-engine";
import {
  IOTEX_CONTROLLER_LASTEST_ACTION,
  IOTEX_CONTROLLER_CONFIRM_ACTION,
  IOTEX_CONTROLLER_CANCEL_ACTION,
} from "@/constant/iotex";
import { actionsSigner } from "../../libs/antenna-action-signer";

async function confirmLastest(_: any, res: any) {
  const action = actionsSigner.actions.shift();
  if (action) {
    action.resolve();
  }
  res.result = "OK";
}

async function cancelLastest(_: any, res: any) {
  const action = actionsSigner.actions.shift();
  if (action) {
    action.reject();
  }
  res.result = "OK";
}

async function getLastest(_: any, res: any) {
  const [action] = actionsSigner.actions;
  res.result = action;
}

export function createSignerMiddleware() {
  return createScaffoldMiddleware({
    [IOTEX_CONTROLLER_LASTEST_ACTION]: createAsyncMiddleware(getLastest),
    [IOTEX_CONTROLLER_CONFIRM_ACTION]: createAsyncMiddleware(confirmLastest),
    [IOTEX_CONTROLLER_CANCEL_ACTION]: createAsyncMiddleware(cancelLastest),
  });
}
