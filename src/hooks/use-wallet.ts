import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { walletSingleton } from "../wallet-core";
import { WalletCore } from "../wallet-core/wallet-core";

const isLockedState = atom<boolean>({
  key: "isLocked",
  default: false,
});

type walletState = {
  lock: boolean;
  createWallet: (password: string) => Promise<WalletCore>;
  unlock: (password: string) => Promise<boolean>;
  wallet: WalletCore;
};

export const useWallet = (): walletState => {
  const [isLocked, setIsLocked] = useRecoilState(isLockedState);

  const unlock = async (password: string): Promise<boolean> => {
    return walletSingleton.unlock(password);
  };

  const createWallet = async (password: string): Promise<WalletCore> => {
    await walletSingleton.createKeyringController(password);
    return walletSingleton;
  };

  useEffect(() => {
    // TODO: timer should use storage from backscript
    let timerId: NodeJS.Timeout;
    if (!isLocked) {
      timerId = setTimeout(() => {
        setIsLocked(true);
      }, 60 * 1000);
    }
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [isLocked]);

  return {
    lock: isLocked,
    createWallet,
    unlock,
    wallet: walletSingleton,
  };
};
