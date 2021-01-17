import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { AccountsOverlay } from "./AccountsOverlay";

const noop = function () {
  console.log("noop");
};

export const Standard: React.FC = () => {
  const [addr, setAddr] = React.useState("test 1");
  return (
    <AccountsOverlay
      accounts={[
        { name: "test 1", address: "test 1" },
        { name: "test 2", address: "test 2" },
        { name: "test 3", address: "test 3" },
        { name: "test 4", address: "test 4" },
        { name: "test 5", address: "test 5" },
      ]}
      address={addr}
      onClickAccount={setAddr}
      onAddAccount={noop}
    />
  );
};

export default {
  title: "Components/AccountsOverlay",
  decorators: [themeDecorator()],
  component: AccountsOverlay,
};
