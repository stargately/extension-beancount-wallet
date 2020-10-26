import recoil from "recoil";
import { NetworkType, networks, INetworkItem } from "../config/networks";

export const networkType = recoil.atom<NetworkType>({
  key: "App.Network.Type",
  default: NetworkType.default,
});

export const networkIndex = recoil.atom<number>({
  key: "App.Network.Index",
  default: 0,
});

export const networksAvailable = recoil.selector<INetworkItem[]>({
  key: "App.Network.Available",
  get: ({ get }) => {
    return networks[get(networkType)] || networks[NetworkType.default];
  },
});

export const networkCurrent = recoil.selector<INetworkItem>({
  key: "App.Network.Current",
  get: ({ get }) => {
    return get(networksAvailable)[get(networkIndex)];
  },
});
