import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { AccountDetail } from "./AccountDetail";

export const Standard: React.FC = () => {
  return (
    <AccountDetail
      visible
      address="io1q68fu6avsfyjaq08ktyyfx8je73z9gp08g8wh9"
      name="test account"
    />
  );
};

export default {
  title: "Components/AccountDetail",
  decorators: [themeDecorator()],
  component: AccountDetail,
};
