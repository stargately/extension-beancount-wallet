import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { Unlock } from "./Unlock";

export const Standard: React.FC = () => <Unlock />;

export default {
  title: "Components/Unlock",
  decorators: [themeDecorator()],
  component: Unlock,
};
