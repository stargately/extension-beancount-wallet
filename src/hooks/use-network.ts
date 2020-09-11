import { atom, useRecoilState } from "recoil";
import { iotexNetworks } from "../wallet-core/antenna-account";
import { useAccount } from "./use-account";

// current account info
const networkState = atom<number>({
  key: "networkState",
  default: 0,
});

const networks = {
  iotex: iotexNetworks,
  default: iotexNetworks,
} as Record<string, Array<{ name: string; uri: string }>>;

type NetworkState = {
  setNetwork: (index: number) => void;
  availableNetworks: Array<{ name: string; uri: string }>;
  current: { name: string; uri: string };
  networkIndex: number;
};

export const useNetwork = (): NetworkState => {
  const { account } = useAccount();
  const [networkIndex, setNetworkIndex] = useRecoilState(networkState);
  const availableNetworks =
    networks[account?.getCoinType() || "iotex"] || networks.default;
  return {
    setNetwork: setNetworkIndex,
    availableNetworks,
    current: availableNetworks[networkIndex],
    networkIndex,
  };
};
