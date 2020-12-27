import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ActionsHistory } from "./ActionsHistory";

export const Standard: React.FC = () => {
  const actions = [
    {
      actionHash: "1",
      address: "o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj",
      recipient: "o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj",
      amount: `${10 ** 18 * 5}`,
    },
    {
      actionHash: "2",
      address: "o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj",
      recipient: "io18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj",
      amount: `${10 ** 18 * 2}`,
    },
    {
      actionHash: "3",
      address: "o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj",
      recipient: "io120hlz4hr9wvvdp6dp7aauy0v754l5um4xn3z9l",
      amount: `${10 ** 18 * 1}`,
    },
  ];
  return <ActionsHistory actions={actions} />;
};

export default {
  title: "Components/ActionsHistory",
  decorators: [themeDecorator()],
  component: ActionsHistory,
};
