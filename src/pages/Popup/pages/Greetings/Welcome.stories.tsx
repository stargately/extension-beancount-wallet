import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { Welcome } from "./Welcome";

export const Standard: React.FC = () => <Welcome />;

export default {
  title: "Components/Welcome",
  decorators: [themeDecorator()],
  component: Welcome,
};
