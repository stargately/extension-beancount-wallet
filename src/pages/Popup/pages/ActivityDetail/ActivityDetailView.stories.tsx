import React from "react";
import { themeDecorator } from "@/storybookUtils";
import { ActivityDetailView } from "./ActivityDetailView";

export const Standard: React.FC = () => {
  return (
    <ActivityDetailView
      actHash="c5a86d6a8d1eaa399f28765eb6d7cf7b1523c48dfbf3be312f4d063341123afc"
      from="io1t92yxark4d48ugk7wgasm5ldagwxnuxk9753an"
      to="io1t92yxark4d48ugk7wgasm5ldagwxnuxk9753an"
      payload=""
      gasFee="10000"
      gasLimit="10000"
      gasPrice="10000"
      date="2020-10-11"
      nonce="10000"
    ></ActivityDetailView>
  );
};

export default {
  title: "Components/ActivityDetailView",
  decorators: [themeDecorator()],
  component: ActivityDetailView,
};
