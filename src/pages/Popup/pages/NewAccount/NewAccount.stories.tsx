import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { NewAccount } from "./NewAccount";

export const Standard: React.FC = () => <NewAccount mode="import" />;

export default {
  title: "Components/NewAccount",
  decorators: [themeDecorator()],
  component: NewAccount,
};
