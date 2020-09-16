// Entrance
import React from "react";
import { RecoilRoot } from "recoil";
import RouterConfig from "../router";
import { WrapTemeProvider } from "../../styles/theme-provider";

import "../../styles/antd.less";

const App = () => {
  return (
    <WrapTemeProvider>
      <RecoilRoot>
        <RouterConfig></RouterConfig>
      </RecoilRoot>
    </WrapTemeProvider>
  );
};

export default App;
