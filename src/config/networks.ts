// @ts-nocheck

export type INetworkItem = {
  name: string;
  uri: string;
};

export const enum NetworkType {
  iotex = "iotex",
  default = "default",
}

export const iotexNetworks: INetworkItem[] = [
  { name: "Main net", uri: "https://api.iotex.one" },
  { name: "Test net", uri: "https://api.testnet.iotex.one" },
];

export const networks = {
  iotex: iotexNetworks,
  default: iotexNetworks,
} as Record<string, INetworkItem[]>;
