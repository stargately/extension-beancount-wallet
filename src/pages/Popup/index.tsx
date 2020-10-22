import React, { Fragment } from "react";
import { render } from "react-dom";
import "./index.css";
import { RecoilRoot, MutableSnapshot } from "recoil";

import { clientSingleton } from "../../daemon/client";
import { StateObserver } from "./state-observer";
import { Popup as App } from "./Popup";
import { queryAtomByKey } from "../../recoil/atom";

const port = chrome.runtime.connect({ name: "Popup" });
clientSingleton.init(port);

clientSingleton
  .getAppState()
  .then((state) => {
    const initializeState = (snapshot: MutableSnapshot) => {
      const appState = (state || {}) as { [prop: string]: any };
      const keys = Object.keys(appState);
      keys.forEach((key) => {
        const val = appState[key];
        const atom = queryAtomByKey(key);
        if (atom) {
          snapshot.set(atom, val);
        }
      });
    };
    render(
      <RecoilRoot initializeState={initializeState}>
        <Fragment>
          <StateObserver></StateObserver>
          <App />
        </Fragment>
      </RecoilRoot>,
      window.document.querySelector("#app-container")
    );
  })
  .catch((e) => {
    console.warn(e);
  });
