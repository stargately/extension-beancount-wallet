import React, { Fragment } from "react";
import { render } from "react-dom";

import { RecoilRoot, MutableSnapshot } from "recoil";
import { clientSingleton } from "../../daemon/client";
import { StateObserver, interestedAtoms } from "./utils";
import { Popup as App } from "./Popup";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";

const port = chrome.runtime.connect({ name: "Popup" });
clientSingleton.init(port);

clientSingleton
  .getAppState()
  .then((state) => {
    const initializeState = (snapshot: MutableSnapshot) => {
      const appState = (state || {}) as { [prop: string]: any };
      Object.keys(appState).forEach((key) => {
        const value = appState[key];
        const atom = interestedAtoms[key];
        if (atom) {
          snapshot.set(atom, value);
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
