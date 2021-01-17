import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { CommonHeader } from "./CommonHeader";
import { Standard as Networks } from "./Networks/Networks.stories";
import { Standard as MyAccounts } from "../AccountsOverlay/AccountsOverlay.stories";

export const Standard: React.FC = () => (
  <CommonHeader networks={<Networks />} overlay={<MyAccounts />} />
);

export default {
  title: "Components/CommonHeader",
  decorators: [themeDecorator()],
  component: CommonHeader,
};
