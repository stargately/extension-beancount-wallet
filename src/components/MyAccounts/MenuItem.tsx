import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { fonts } from "../../styles/style-font";

interface MenuItemProps {
  icon: () => JSX.Element;
  content: string;
  onClick?: () => void;
}

export const MenuItem = ({ icon: IconComponent, ...rest }: MenuItemProps) => {
  return (
    <MenuContainer onClick={rest.onClick}>
      <IconComponent />

      <MenuText>{rest.content}</MenuText>
    </MenuContainer>
  );
};

const MenuContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: $theme.sizing[3],
}));

const MenuText = styled("div", ({ $theme }) => ({
  ...fonts.normal,
  color: $theme.colors.white,
  marginLeft: $theme.sizing[2],
}));
