import React from "react";

import { themeDecorator } from "@/storybookUtils";
import { CreatePasswordForm } from "./CreatePasswordForm";

export const Standard: React.FC = () => (
  <CreatePasswordForm
    onFinish={() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }}
  />
);

export default {
  title: "Components/CreatePasswordForm",
  decorators: [themeDecorator()],
  component: CreatePasswordForm,
};
