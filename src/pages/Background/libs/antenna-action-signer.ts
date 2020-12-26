import { AbstractMethod } from "iotex-antenna/lib/action/method";
import { Envelop } from "iotex-antenna/lib/action/envelop";
import { walletSingleton } from "@/wallet-core";
import { AntennaAccount } from "@/wallet-core/antenna-account";
import { openExtensionInBrowser } from "./platforms";
import {
  getCurrentAccountAddress,
  getCurrentNetworkUri,
} from "../antenna-controller-engine/middlewares/recoilState";

class AntennaMethod extends AbstractMethod {}

class ActionSigner {
  actions: {
    id: number;
    env: Envelop;
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
  }[] = [];

  async waitingConfirm(id: number, env: Envelop) {
    return new Promise((resolve, reject) => {
      this.actions.unshift({ id, env, resolve, reject });
      openExtensionInBrowser("/confirm-transaction");
    });
  }

  async signAndSend(env: Envelop) {
    const acc = walletSingleton.getAccount(
      getCurrentAccountAddress()
    ) as AntennaAccount;
    if (!acc) {
      throw new Error("can find current account");
    }
    acc.setProvider(getCurrentNetworkUri());
    const method = new AntennaMethod(
      acc.antenna.iotx,
      acc.antenna.iotx.accounts[0]
    );
    return method.sendAction(env);
  }
}

export const actionsSigner = new ActionSigner();
