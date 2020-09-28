import React, { useEffect, useState } from "react";
import { styled } from "onefx/lib/styletron-react";
import { AssetItem } from "./AssetItem";

interface UserAsset {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

export const AssetsTable = () => {
  const [assets, setAssets] = useState<UserAsset[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    console.log("fetch assets");
    setAssets([
      {
        id: 1,
        imageUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601059249395&di=1bcde71078361145ddb3693b301d2254&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180416%2Fe18d4c8f22304ef5a866ea1ea2e235e6.png",
        name: "$540.34 USD",
        description: "1.614 ETH",
      },
      {
        id: 2,
        imageUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601059249395&di=1bcde71078361145ddb3693b301d2254&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180416%2Fe18d4c8f22304ef5a866ea1ea2e235e6.png",
        name: "$540.34 USD",
        description: "1.614 ETH",
      },
    ]);
  };

  return (
    <>
      {assets.map((item) => (
        <div key={item.id}>
          <AssetItem asset={item} />
          <HDivider />
        </div>
      ))}
    </>
  );
};

const HDivider = styled("div", {
  backgroundColor: "rgba(0,0,0,0.1)",
  height: "1px",
  marginLeft: "5px",
  marginRight: "5px",
});
