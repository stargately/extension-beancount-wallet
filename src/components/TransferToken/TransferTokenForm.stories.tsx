import React from "react";

import { themeDecorator } from "../../storybookUtils";
import { TransferTokenForm } from "./TransferTokenForm";

export const Form: React.FC = () => <TransferTokenForm />;

export default {
  title: "Components/TransferTokenForm",
  decorators: [themeDecorator()],
  component: TransferTokenForm,
};
