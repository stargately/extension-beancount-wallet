import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Popup } from "./Popup";
import { StoreClient } from "../../client/store";

const port = chrome.runtime.connect({ name: "Popup" });
const client = new StoreClient(port);

client.getState().then((state) => {
  console.log("Inital state is", state);
  render(
    <Popup
      initalState={state || { count: 0 }}
      syncState={(s) => client.setState(s)}
    />,
    window.document.querySelector("#app-container")
  );
});
