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
    <AssetContainer>
      <CircleAssetIcon src={props.asset.imageUrl} />

      <RightContainer>
        <AssetNameText>{props.asset.name}</AssetNameText>
        <AssetAmountText>{props.asset.description}</AssetAmountText>
      </RightContainer>

      <RightArrowIcon />
    </AssetContainer>
  );
};

const AssetContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: $theme.sizing[4],
  paddingBottom: $theme.sizing[4],
}));

const RightContainer = styled("div", ({ $theme }) => ({
  flexGrow: 1,
  marginLeft: $theme.sizing[3],
}));

const CircleAssetIcon = styled("img", ({ $theme }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginLeft: $theme.sizing[4],
}));

const AssetNameText = styled("div", ({ $theme }) => ({
  fontSize: "16px",
  color: $theme.colors.black,
}));

const AssetAmountText = styled("div", ({ $theme }) => ({
  fontSize: "12px",
  color: $theme.colors.black60,
}));

const RightArrowIcon = styled(RightOutlined, ({ $theme }) => ({
  marginRight: $theme.sizing[1],
}));
