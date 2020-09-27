import React from "react";
import { fonts } from "../../styles/style-font";

interface MenuItemProps {
  icon: () => JSX.Element;
  content: string;
}

export const MenuItem = ({ icon: IconComponent, ...rest }: MenuItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "15px",
      }}
    >
      <IconComponent />

      <div style={{ ...fonts.normal, color: "white", marginLeft: "10px" }}>
        {rest.content}
      </div>
    </div>
  );
};
