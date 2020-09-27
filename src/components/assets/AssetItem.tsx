import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { RightOutlined } from "@ant-design/icons";

interface Asset {
  imageUrl: string;
  name: string;
  description: string;
}

interface AssetItemProps {
  asset: Asset;
}

export const AssetItem = (props: AssetItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        justifyContent: "space-between",
      }}
    >
      <CircleAssetIcon
        src={props.asset.imageUrl}
        style={{
          marginLeft: "20px",
        }}
      />

      <div style={{ flexGrow: 1, marginLeft: "15px" }}>
        <div style={{ fontSize: "16px", color: "black" }}>
          {props.asset.name}
        </div>
        <div style={{ fontSize: "12px", color: "gray" }}>
          {props.asset.description}
        </div>
      </div>

      <RightOutlined
        style={{
          marginRight: "5px",
        }}
      />
    </div>
  );
};

const CircleAssetIcon = styled("img", {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
});
