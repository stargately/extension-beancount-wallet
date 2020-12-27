import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { AssetsTable } from "./AssetsTable";

export const Standard: React.FC = () => <AssetsTable />;

export default {
  title: "Components/AssetsTable",
  decorators: [themeDecorator()],
  component: AssetsTable,
};
