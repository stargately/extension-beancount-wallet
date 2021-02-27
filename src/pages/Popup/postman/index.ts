import { LeanAccount, AccountMeta, Action } from "@/wallet-core";
import { MessageClient } from "@/utils/message-client";

import {
  IOTEX_CONTROLLER_STORAGE_RECOIL_STATE,
  IOTEX_CONTROLLER_GET_RECOIL_STATE,
  IOTEX_CONTROLLER_GET_ACCOUNTS,
  IOTEX_CONTROLLER_CREATE_PASSWORD,
  IOTEX_CONTROLLER_LOCK,
  IOTEX_CONTROLLER_LOCKED,
  IOTEX_CONTROLLER_UNLOCK,
  IOTEX_CONTROLLER_INITED,
  IOTEX_CONTROLLER_VERIFY_PASSWORD,
  IOTEX_CONTROLLER_CREATE_ACCOUNT,
  IOTEX_CONTROLLER_EDIT_ACCOUNT,
  IOTEX_CONTROLLER_DELETE_ACCOUNT,
  IOTEX_CONTROLLER_ACCOUNT_META,
  IOTEX_CONTROLLER_TRANSFER_TOKEN,
  IOTEX_CONTROLLER_GET_ACTIONS,
  IOTEX_CONTROLLER_QUERY_ACTION,
  IOTEX_CONTROLLER_CONFIRM_ACTION,
  IOTEX_CONTROLLER_CANCEL_ACTION,
  IOTEX_CONTROLLER_LASTEST_ACTION,
  IOTEX_CONTROLLER_XRC20,
  IOTEX_CONTROLLER_XRC20_TRANSFER,
  IOTEX_CONTROLLER_EXPORT_PRIVATEKEY,
} from "@/constant/iotex";

class Postman extends MessageClient {
  async getAccounts(): Promise<LeanAccount[]> {
    return this.send<string, LeanAccount[]>(IOTEX_CONTROLLER_GET_ACCOUNTS);
  }

  async createAccount(name: string, privateKey?: string) {
    return this.send<{ name: string; privateKey?: string }, string>(
      IOTEX_CONTROLLER_CREATE_ACCOUNT,
      { name, privateKey }
    );
  }

  async editAccount(address: string, name: string) {
    return this.send<{ name: string; address?: string }, string>(
      IOTEX_CONTROLLER_EDIT_ACCOUNT,
      { name, address }
    );
  }

  async removeAccount(address: string) {
    return this.send(IOTEX_CONTROLLER_DELETE_ACCOUNT, { address });
  }

  async getAccountMeta() {
    const { accountMeta } = await this.send<void, { accountMeta: AccountMeta }>(
      IOTEX_CONTROLLER_ACCOUNT_META
    );
    return accountMeta;
  }

  async setRecoilState(data: Record<string, any>) {
    return this.send(IOTEX_CONTROLLER_STORAGE_RECOIL_STATE, { ...data });
  }

  async getRecoilState() {
    return this.send<void, Record<string, unknown>>(
      IOTEX_CONTROLLER_GET_RECOIL_STATE
    );
  }

  async createPassword(password: string, privateKey?: string) {
    return this.send(IOTEX_CONTROLLER_CREATE_PASSWORD, {
      password,
      privateKey,
    });
  }

  async walletLock() {
    return this.send(IOTEX_CONTROLLER_LOCK);
  }

  async walletUnlock(password: string) {
    return this.send(IOTEX_CONTROLLER_UNLOCK, { password });
  }

  async walletLocked() {
    return this.send<void, boolean>(IOTEX_CONTROLLER_LOCKED);
  }

  async walletInited() {
    return this.send<void, boolean>(IOTEX_CONTROLLER_INITED);
  }

  async verifyPasswd(password: string) {
    return this.send<{ password: string }, boolean>(
      IOTEX_CONTROLLER_VERIFY_PASSWORD,
      { password }
    );
  }

  async transferToken(
    to: string,
    amount: number,
    gasPrice: number,
    gasLimit: number
  ) {
    return this.send(IOTEX_CONTROLLER_TRANSFER_TOKEN, {
      to,
      amount,
      gasPrice,
      gasLimit,
    });
  }

  async xrc20Transfer(
    to: string,
    amount: number,
    gasPrice: number,
    gasLimit: number,
    asset: string
  ) {
    return this.send(IOTEX_CONTROLLER_XRC20_TRANSFER, {
      to,
      amount,
      gasPrice,
      gasLimit,
      asset,
    });
  }

  async getActions(start: number, count: number) {
    const { actionInfo } = await this.send<
      { start: number; count: number },
      { actionInfo: Action[] }
    >(IOTEX_CONTROLLER_GET_ACTIONS, { start, count });
    return actionInfo;
  }

  async queryActionDetail(actionHash: string) {
    return this.send<{ actionHash: string }, Action>(
      IOTEX_CONTROLLER_QUERY_ACTION,
      {
        actionHash,
      }
    );
  }

  async confirmLastestAction() {
    return this.send(IOTEX_CONTROLLER_CONFIRM_ACTION);
  }

  async cancelLastestAction() {
    return this.send(IOTEX_CONTROLLER_CANCEL_ACTION);
  }

  async getLastestUnapprovedAction() {
    return this.send<void, any>(IOTEX_CONTROLLER_LASTEST_ACTION);
  }

  async getXrc20Tokens() {
    return this.send<void, { name: string; balance: any }[]>(
      IOTEX_CONTROLLER_XRC20
    );
  }

  async exportPrivateKey(address: string) {
    return this.send<{ address: string }, string>(
      IOTEX_CONTROLLER_EXPORT_PRIVATEKEY,
      { address }
    );
  }
}

export const defaultPostman: Postman = new Postman();
