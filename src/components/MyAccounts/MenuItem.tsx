import React from "react";
import { fonts } from "../../styles/style-font";
import { styled } from "onefx/lib/styletron-react";

interface MenuItemProps {
  icon: () => JSX.Element;
  content: string;
}

export const MenuItem = ({ icon: IconComponent, ...rest }: MenuItemProps) => {
  return (
    <MenuContainer>
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
