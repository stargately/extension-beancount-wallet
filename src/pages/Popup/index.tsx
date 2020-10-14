import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Popup } from "./Popup";
import ClientAgent from "../../daemon/client";

const port = chrome.runtime.connect({ name: "Popup" });
const client = new ClientAgent(port);

client.getAppState().then((state) => {
  console.log("Inital state is", state);
  render(
    <Popup
      initalState={state || { count: 0 }}
      syncState={(s) => client.setAppState(s)}
    />,
    window.document.querySelector("#app-container")
  );
});
