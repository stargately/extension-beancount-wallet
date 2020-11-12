import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { MyAccounts } from "./MyAccounts";

const noop = function () {
  console.log("noop");
};

export const Standard: React.FC = () => (
  <MyAccounts
    accounts={[
      { name: "test 1", address: "test 1" },
      { name: "test 2", address: "test 2" },
    ]}
    address="test 1"
    onClickAccount={noop}
    onAddAccount={noop}
  />
);

export default {
  title: "Components/MyAccounts",
  decorators: [themeDecorator()],
  component: MyAccounts,
};
