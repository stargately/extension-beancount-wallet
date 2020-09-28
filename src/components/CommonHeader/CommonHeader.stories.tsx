import React from "react";
import { themeDecorator } from "../../storybookUtils";
import { CommonHeader } from "./CommonHeader";

export const Standard: React.FC = () => <CommonHeader />;

export default {
  title: "Components/CommonHeader",
  decorators: [themeDecorator()],
  component: CommonHeader,
};
