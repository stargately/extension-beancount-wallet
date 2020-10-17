import { HandlerGroup } from "./agent";
import localStore from "../utils/localStore";

export const GET_STATE = "APP.STATE.GET";
export const SET_STATE = "APP.STATE.SET";
export const UPDATE_STATE = "APP.UPDATE_STATE";

export default {
  [GET_STATE]: async (_, cb) => {
    try {
      const data = await localStore.get();
      cb(data);
    } catch (e) {
      cb(e);
    }
  },
  [SET_STATE]: (res, cb) => {
    const { payload } = res;
    localStore.set(payload);
    cb();
  },
  [UPDATE_STATE]: async (res, cb) => {
    const { payload } = res;
    const originData = (await localStore.get()) as any;
    const data = { ...originData, ...payload };
    localStore.set(data);
    cb();
  },
} as HandlerGroup;
