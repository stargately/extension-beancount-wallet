import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Popup } from "./Popup";

chrome.runtime.connect({ name: "knockknock" });

render(<Popup />, window.document.querySelector("#app-container"));
