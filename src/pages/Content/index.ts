// @ts-nocheck
import { content } from "../../../utils/inpage";
import { injectScript } from "./utils";

window.addEventListener("message", function (e: any) {
  console.log("receive message in content script", e);
});

injectScript(content);
