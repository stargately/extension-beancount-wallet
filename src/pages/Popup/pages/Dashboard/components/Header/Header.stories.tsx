import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { Header } from "./Header";
import { Standard as Networks } from "./Networks/Networks.stories";
import { Standard as MyAccounts } from "../AccountsOverlay/AccountsOverlay.stories";

export const Standard: React.FC = () => (
  <Header networks={<Networks />} overlay={<MyAccounts />} />
);

export default {
  title: "Components/Header",
  decorators: [themeDecorator()],
  component: Header,
};
