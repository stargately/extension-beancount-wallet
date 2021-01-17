import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { Import } from "./Import";

export const Standard: React.FC = () => <Import />;

export default {
  title: "Components/Import",
  decorators: [themeDecorator()],
  component: Import,
};
