import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { networks } from "@/config/networks";
import { Networks } from "./Networks";

export const Standard: React.FC = () => (
  <Networks networks={networks.default} current={networks.default[0]} />
);

export default {
  title: "Components/Networks",
  decorators: [themeDecorator()],
  component: Networks,
};
