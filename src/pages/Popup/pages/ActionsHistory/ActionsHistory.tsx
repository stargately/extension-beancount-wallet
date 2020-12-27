import React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";

import { ActionItem, IAction } from "./ActionItem";

type Props = {
  actions: IAction[];
};

export const ActionsHistory: React.FC<Props> = ({ actions }) => {
  if (actions.length === 0) {
    return <Container>No Activity</Container>;
  }
  const history = useHistory();
  const onClick = React.useCallback((e: IAction) => {
    history.push(`/activity/${e.actionHash}`, e.raw);
  }, []);
  return (
    <Container>
      {actions.map((e, id) => {
        return (
          <ActionItem
            key={id}
            actionHash={e.actionHash}
            address={e.address}
            recipient={e.recipient}
            amount={e.amount}
            raw={e.raw}
            onClick={onClick}
          ></ActionItem>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
});
