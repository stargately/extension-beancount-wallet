import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ActionItem } from "./ActionItem";

export const Standard: React.FC = () => {
  return (
    <ActionItem
      actionHash="1"
      address="o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj"
      recipient="o18v5n2dr2fpcneg2tdzd6yx0elfavpq2wn2j6sj"
      amount={`${10 ** 18 * 5}`}
    />
  );
};

export default {
  title: "Components/ActionItem",
  decorators: [themeDecorator()],
  component: ActionItem,
};
