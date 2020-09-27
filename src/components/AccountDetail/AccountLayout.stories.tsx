import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { AccountLayout } from "./AccountLayout";

export const Standard: React.FC = () => <AccountLayout />;

export default {
  title: "Components/AccountLayout",
  decorators: [themeDecorator()],
  component: AccountLayout,
};
