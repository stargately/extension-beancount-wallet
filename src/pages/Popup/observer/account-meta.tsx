import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { accountAddress, networkIndex, accountCurrentMeta } from "@/recoil";
import { defaultPostman } from "@/pages/Popup/postman";

export const AccountMetaObserver = () => {
  const address = useRecoilValue(accountAddress);
  const network = useRecoilValue(networkIndex);
  const setMeta = useSetRecoilState(accountCurrentMeta);
  const onQuery = () => {
    defaultPostman.getAccountMeta().then((res: any) => setMeta(res));
  };
  useEffect(() => {
    onQuery();
    const timer = setInterval(onQuery, 30 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [address, network]);
  return null;
};
