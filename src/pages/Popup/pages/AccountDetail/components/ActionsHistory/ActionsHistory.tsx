import React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "onefx/lib/styletron-react";

import { Action } from "@/wallet-core/wallet-core";
import { ActionItem } from "./ActionItem";

type Props = {
  actions: Action[];
};

export const ActionsHistory: React.FC<Props> = ({ actions }) => {
  if (actions.length === 0) {
    return <Container>No Activity</Container>;
  }
  const history = useHistory();
  const onClick = React.useCallback((e: Action) => {
    history.push(`/activity/${e.actHash}`);
  }, []);
  return (
    <Container>
      {actions.map((act) => {
        return (
          <ActionItem
            onClick={onClick}
            action={act}
            key={act.actHash}
          ></ActionItem>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
});
