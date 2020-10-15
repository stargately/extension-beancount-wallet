import React, { Fragment } from "react";
import { render } from "react-dom";
import "./index.css";
import { RecoilRoot } from "recoil";
import { Popup as App } from "./Popup";
import DaemonClient, { getSingleton } from "../../daemon/client";
import { StateObserver } from "./state";

const port = chrome.runtime.connect({ name: "Popup" });
const client = new DaemonClient(port);

getSingleton(client)
  .getAppState()
  .then((state) => {
    console.log("Inital state is", state);
    render(
      <RecoilRoot>
        <Fragment>
          <StateObserver></StateObserver>
          <App />
        </Fragment>
      </RecoilRoot>,
      window.document.querySelector("#app-container")
    );
  });
