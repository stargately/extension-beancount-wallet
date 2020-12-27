import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ConfirmTransactionComponent } from "./confirm-transaction";

export const Standard: React.FC = () => {
  return (
    <ConfirmTransactionComponent
      amount="100000000000000000"
      gasLimit="100000000000"
      gasPrice="10000000000"
      toContract="io11234234234"
    />
  );
};

export default {
  title: "Components/ConfirmTransaction",
  decorators: [themeDecorator()],
  component: ConfirmTransactionComponent,
};
