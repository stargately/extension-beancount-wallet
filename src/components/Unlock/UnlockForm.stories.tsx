import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { UnlockForm } from "./UnlockForm";

export const Standard: React.FC = () => <UnlockForm />;

export default {
  title: "Components/UnlockForm",
  decorators: [themeDecorator()],
  component: UnlockForm,
};
