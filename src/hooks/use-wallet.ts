import { useEffect } from "react";
import { atom, useRecoilState, selector, useRecoilValue } from "recoil";

const lockState = atom<boolean>({
  key: "lockState",
  default: false,
});

const pwdState = atom<string | null>({
  key: "pwdState",
  default: "",
});

const hasPwdState = selector({
  key: "hasPwdState",
  get: ({ get }) => {
    const pwd = get(pwdState);
    return pwd !== "";
  },
});

type walletState = {
  lock: boolean;
  hasPwd: boolean;
  setPwd: (pwd: string) => void;
  verifyPwd: (toVerify: string) => boolean;
};

export const useWallet = (): walletState => {
  const [pwd, setPwd] = useRecoilState(pwdState);
  const [lock, setLock] = useRecoilState(lockState);
  const hasPwd = useRecoilValue(hasPwdState);

  const verifyPwd = (toVerify: string) => {
    return toVerify === pwd;
  };

  useEffect(() => {
    // TODO: timer should use storage from backscript
    let timerId: NodeJS.Timeout;
    if (!lock) {
      timerId = setTimeout(() => {
        setLock(true);
      }, 60 * 1000);
    }
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [lock]);

  return {
    lock,
    hasPwd,
    setPwd,
    verifyPwd,
  };
};
