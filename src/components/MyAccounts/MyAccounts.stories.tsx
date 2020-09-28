import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { MyAccounts } from "./MyAccounts";

export const Standard: React.FC = () => <MyAccounts />;

export default {
  title: "Components/MyAccounts",
  decorators: [themeDecorator()],
  component: MyAccounts,
};
