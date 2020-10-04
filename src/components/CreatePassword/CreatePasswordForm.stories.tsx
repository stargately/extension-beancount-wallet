import React from "react";

import { themeDecorator } from "../../storybookUtils";
import { CreatePasswordForm } from "./CreatePasswordForm";

export const Standard: React.FC = () => (
  <CreatePasswordForm onFinish={() => null} />
);

export default {
  title: "Components/CreatePasswordForm",
  decorators: [themeDecorator()],
  component: CreatePasswordForm,
};
