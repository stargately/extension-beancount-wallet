import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { accountActions, accountCurrentMeta } from "@/recoil";
import { defaultPostman } from "@/pages/Popup/postman";

export const AccountActionsObserver = () => {
  const setActions = useSetRecoilState(accountActions);
  const meta = useRecoilValue(accountCurrentMeta);
  const start = Math.max(0, +meta.numActions - 10);
  const onQuery = () => {
    defaultPostman.getActions(start, 10).then((res: any) => setActions(res));
  };
  useEffect(() => {
    onQuery();
    const timer = setInterval(onQuery, 30 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [meta]);
  return null;
};
