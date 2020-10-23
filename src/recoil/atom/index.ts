import recoil from "recoil";

export const accountState = recoil.atom({
  key: "App.Account",
  default: "",
});

export const networkState = recoil.atom<number>({
  key: "Network.State",
  default: 0,
});

const AtomMap = {
  "App.Account": accountState,
  "Network.State": networkState,
} as { [propt: string]: recoil.RecoilState<any> };

// There is no api for searching atom by recoil 0.0.13
export function queryAtomByKey(key: string) {
  return AtomMap[key];
}
