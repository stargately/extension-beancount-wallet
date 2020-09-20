import React from "react";

import { themeDecorator } from "../../storybookUtils";
import { TransferTokenForm } from "./TransferTokenForm";

export const Standard: React.FC = () => <TransferTokenForm />;

export default {
  title: "Components/TransferTokenForm",
  decorators: [themeDecorator()],
  component: TransferTokenForm,
};
