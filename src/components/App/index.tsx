// Entrance
import React from "react";
import RouterConfig from "../router";
import { WrapThemeProvider } from "../../styles/theme-provider";
import "../../styles/antd.less";

const App: React.FC = () => {
  return (
    <WrapThemeProvider>
      <RouterConfig />
    </WrapThemeProvider>
  );
};

export default App;
