import React from "react";

import { AddRecipient } from "./AddRecipient";
import { themeDecorator } from "../../storybookUtils";

export const Standard: React.FC = () => <AddRecipient />;

export default {
  title: "Components/AddRecipient",
  decorators: [themeDecorator()],
  component: AddRecipient,
};
