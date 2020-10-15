import { HandlerGroup } from "./agent";
import localStore from "../utils/localStore";

export const GET_STATE = "APP.STATE.GET";
export const SET_STATE = "APP.STATE.SET";

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
} as HandlerGroup;
