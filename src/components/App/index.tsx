// Entrance
import React, { useState, useCallback } from "react";
import { RecoilRoot } from "recoil";
import RouterConfig from "../router";
import { WrapThemeProvider } from "../../styles/theme-provider";
import { StateContext } from "./context";
import "../../styles/antd.less";

type Prop = {
  initalState: any;
  syncState: (state: any) => void;
};

const App: React.FC<Prop> = ({ initalState, syncState }) => {
  const [state, _setState] = useState(initalState);
  const setState = useCallback((s: any) => {
    _setState(s);
    syncState(s);
  }, []);
  return (
    <WrapThemeProvider>
      <StateContext.Provider value={{ state, setState }}>
        <RecoilRoot>
          <RouterConfig />
        </RecoilRoot>
      </StateContext.Provider>
    </WrapThemeProvider>
  );
};

export default App;
