// @ts-nocheck

export type INetworkItem = {
  name: string;
  uri: string;
  iotexscan: string;
};

export enum NetworkType {
  iotex = "iotex",
  default = "default",
}

export const iotexNetworks: INetworkItem[] = [
  {
    name: "Main net",
    uri: "https://api.iotex.one",
    iotexscan: "https://iotexscan.io",
  },
  {
    name: "Test net",
    uri: "https://api.testnet.iotex.one",
    iotexscan: "https://testnet.iotexscan.io",
  },
];

export const networks = {
  iotex: iotexNetworks,
  default: iotexNetworks,
} as Record<string, INetworkItem[]>;
