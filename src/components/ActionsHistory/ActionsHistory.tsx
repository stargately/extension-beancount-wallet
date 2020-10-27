import React from "react";

import { styled } from "onefx/lib/styletron-react";
import { ActionItem, IAction } from "./ActionItem";

type Props = {
  actions: IAction[];
};

export const ActionsHistory: React.FC<Props> = ({ actions }) => {
  if (actions.length === 0) {
    return <Container>No Activity</Container>;
  }
  return (
    <Container>
      {actions.map((e, id) => {
        return (
          <ActionItem
            key={id}
            address={e.address}
            recipient={e.recipient}
            amount={e.amount}
          ></ActionItem>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
});
