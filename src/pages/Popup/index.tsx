import React, { Fragment } from "react";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { JsonRpcEngine } from "json-rpc-engine";

// @ts-ignore
import createJsonRpcStream from "json-rpc-middleware-stream";
import pump from "pump";
import PortStream from "extension-port-stream";

import { setupMultiplex } from "@/utils/stream-utils";

import { defaultPostman } from "./postman";
import { StateObserver, initializeSnapshot } from "./utils";
import App from "./pages/Routes";

import "react-perfect-scrollbar/dist/css/styles.css";
import "@/styles/antd.less";
import "./index.css";

function initializeController(port: chrome.runtime.Port) {
  const stream = new PortStream(port);
  const mux = setupMultiplex(stream);
  mux.ignoreStream("ignore");
  const controllerStream = mux.createStream("controller");
  const engine = new JsonRpcEngine();
  defaultPostman.init(engine);

  const jsonRpcConnection = createJsonRpcStream();
  engine.push(jsonRpcConnection.middleware);

  const clientSideStream = jsonRpcConnection.stream;
  pump(clientSideStream, controllerStream, clientSideStream, () => {
    console.warn("connection Disconnect");
  });
}

async function initialize() {
  const port = chrome.runtime.connect({ name: "Popup" });
  initializeController(port);
  const state = await defaultPostman.getRecoilState();

  render(
    <RecoilRoot initializeState={initializeSnapshot(state)}>
      <Fragment>
        <StateObserver></StateObserver>
        <App />
      </Fragment>
    </RecoilRoot>,
    window.document.querySelector("#app-container")
  );
}

initialize();
