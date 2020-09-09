import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Unlock } from "./Unlock";

export default {
  title: "Components/Unlock",
  component: Unlock,
} as Meta;

const Template: Story = (args) => <Unlock {...args} />;

export const Default = Template.bind({});
