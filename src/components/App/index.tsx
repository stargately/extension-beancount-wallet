// Entrance
import React from "react";
import { RecoilRoot } from "recoil";
import RouterConfig from "../router";
import { WrapThemeProvider } from "../../styles/theme-provider";

import "../../styles/antd.less";

const App: React.FC = () => {
  return (
    <WrapThemeProvider>
      <RecoilRoot>
        <RouterConfig />
      </RecoilRoot>
    </WrapThemeProvider>
  );
};

export default App;
