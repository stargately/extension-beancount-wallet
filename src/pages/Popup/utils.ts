import recoil from "recoil";
import { clientSingleton } from "../../daemon/client";
import {
  networkIndex,
  networkType,
  accountAddress,
  accountsList,
} from "../../recoil";

export const interestedAtoms = {
  [networkIndex.key]: networkIndex,
  [networkType.key]: networkType,
  [accountAddress.key]: accountAddress,
  [accountsList.key]: accountsList,
};

export const StateObserver = () => {
  recoil.useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const data: { [prop: string]: any } = {};
    // @ts-ignore
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (
        atomLoadable.state === "hasValue" &&
        interestedAtoms[modifiedAtom.key]
      ) {
        data[modifiedAtom.key] = atomLoadable.contents;
      }
    }
    clientSingleton.updateAppState(data);
  });
  return null;
};
