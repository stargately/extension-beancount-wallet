// @ts-nocheck

export type INetworkItem = {
  name: string;
  uri: string;
  iotexscan: string;
  xrc20: {
    address: string[];
  };
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
    xrc20: {
      address: [
        "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw",
        "io1gafy2msqmmmqyhrhk4dg3ghc59cplyhekyyu26",
      ],
    },
  },
  {
    name: "Test net",
    uri: "https://api.testnet.iotex.one",
    iotexscan: "https://testnet.iotexscan.io",
    xrc20: {
      address: ["io14j96vg9pkx28htpgt2jx0tf3v9etpg4j9h384m"],
    },
  },
];

export const networks = {
  iotex: iotexNetworks,
  default: iotexNetworks,
} as Record<string, INetworkItem[]>;
