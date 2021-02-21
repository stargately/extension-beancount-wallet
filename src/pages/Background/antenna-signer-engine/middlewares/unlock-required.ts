import { JsonRpcMiddleware } from "json-rpc-engine";
import { walletSingleton } from "@/wallet-core";

export const createUnlockRequireMiddleware: () => JsonRpcMiddleware<
  unknown,
  unknown
> = () => (_, __, next, end) => {
  if (walletSingleton.isLocked) {
    end(new Error("unlock required"));
  }
  next();
};
