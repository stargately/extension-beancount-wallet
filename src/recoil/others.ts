import recoil from "recoil";

export const appTabActiveKey = recoil.atom<string>({
  key: "App.Tab.ActiveKey",
  default: "asset",
});
