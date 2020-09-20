import React from "react";

import { themeDecorator } from "../../storybookUtils";
import { CreatePassword } from "./CreatePassword";

export const Standard: React.FC = () => <CreatePassword />;

export default {
  title: "Components/CreatePassword",
  decorators: [themeDecorator()],
  component: CreatePassword,
};
