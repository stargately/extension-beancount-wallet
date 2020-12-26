import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ConfirmTransactionComponent } from "./confirm-transaction";

export const Standard: React.FC = () => {
  return <ConfirmTransactionComponent />;
};

export default {
  title: "Components/ConfirmTransaction",
  decorators: [themeDecorator()],
  component: ConfirmTransactionComponent,
};
