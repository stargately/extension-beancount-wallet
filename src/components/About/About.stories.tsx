import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { About } from "./About";

export const Standard: React.FC = () => {
  return <About />;
};

export default {
  title: "Components/About",
  decorators: [themeDecorator()],
  component: About,
};
