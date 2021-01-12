import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ImportAccountForm } from "./ImportAccountForm";

export const Standard: React.FC = () => <ImportAccountForm />;

export default {
  title: "Components/ImportAccountForm",
  decorators: [themeDecorator()],
  component: ImportAccountForm,
};
