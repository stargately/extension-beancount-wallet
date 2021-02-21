import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { accountAddress, networkIndex, accountTokens } from "@/recoil";
import { defaultPostman } from "@/pages/Popup/postman";

export const AccountTokensObserver = () => {
  const address = useRecoilValue(accountAddress);
  const network = useRecoilValue(networkIndex);
  const setTokens = useSetRecoilState(accountTokens);
  const onQuery = () => {
    defaultPostman.getXrc20Tokens().then((res: any) => {
      setTokens(res);
    });
  };
  useEffect(() => {
    onQuery();
    const timer = setInterval(onQuery, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [address, network]);
  return null;
};
