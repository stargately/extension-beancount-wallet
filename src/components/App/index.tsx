// Entrance
import React from "react";
import { RecoilRoot } from "recoil";
import RouterConfig from "../router";

const App = () => {
  return (
    <RecoilRoot>
      <RouterConfig></RouterConfig>
    </RecoilRoot>
  );
};

export default App;
