import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { ImportKeyForm } from "./ImportKeyForm";

export const Standard: React.FC = () => <ImportKeyForm />;

export default {
  title: "Components/ImportKeyForm",
  decorators: [themeDecorator()],
  component: ImportKeyForm,
};
