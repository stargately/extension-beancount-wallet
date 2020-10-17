import recoil from "recoil";
import { getSingleton } from "../../daemon/client";

export const StateObserver = () => {
  recoil.useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const data: { [prop: string]: any } = {};
    // @ts-ignore
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === "hasValue") {
        data[modifiedAtom.key] = atomLoadable.contents;
      }
    }
    getSingleton().updateAppState(data);
  });
  return null;
};
