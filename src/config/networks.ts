// @ts-nocheck

export type INetworkItem = {
  name: string;
  uri: string;
  iotexscan: string;
  xrc20: {
    address: { url: string; name: string }[];
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
        { url: "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw", name: "VITA" },
        { url: "io1qfvgvmk6lpxkpqwlzanqx4atyzs86ryqjnfuad", name: "ioETH" },
        { url: "io19fsq8e9krrlng4ay5gyq6q5tqfym28yq9ly0fz", name: "ioPAXG" },
        { url: "io14nhfkywdfvl40evgsqnh43ev33q6he8yez8c8a", name: "ioBUSD" },
        { url: "io1c7unwg8h8vph89xwqru4f7zfa4yy5002wxvlrm", name: "ioWBTC" },
        { url: "io1ahh04jn2zkqlug6feh7rpq75a75p3rj42hp4ch", name: "ioUNI" },
        { url: "io1gafy2msqmmmqyhrhk4dg3ghc59cplyhekyyu26", name: "METX" },
        { url: "io13z9y0kqcgsmke00xwdalcup2zz3pwhuhexd22e", name: "SDI" },
        { url: "io1er3t54p96l6x70l9hmd6nmx7sm74jc9sz287m6", name: "ioUSDT" },
        { url: "io1f4acssp65t6s90egjkzpvrdsrjjyysnvxgqjrh", name: "CYC" },
      ],
    },
  },
  {
    name: "Test net",
    uri: "https://api.testnet.iotex.one",
    iotexscan: "https://testnet.iotexscan.io",
    xrc20: {
      address: [],
    },
  },
];

export const networks = {
  iotex: iotexNetworks,
  default: iotexNetworks,
} as Record<string, INetworkItem[]>;
