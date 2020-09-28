import React from "react";
import { themeDecorator } from "../../../storybookUtils";
import { Networks } from "./Networks";

export const Standard: React.FC = () => <Networks />;

export default {
  title: "Components/Networks",
  decorators: [themeDecorator()],
  component: Networks,
};
