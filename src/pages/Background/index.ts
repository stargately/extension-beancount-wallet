import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

import extension from "extensionizer";
import localStore from "../../utils/localStore";
import daemon from "../../daemon";

console.log("This is the background page.");
console.log("Put the background scripts here.");
// eslint-disable-next-line no-undef
extension.runtime.onInstalled.addListener(() => {
  console.log("App installed");
});

extension.runtime.onConnect.addListener((port) => {
  daemon.connect(port);
});

const isDev = process.env.NODE_CONFIG_ENV === "dev";
if (isDev) {
  (global as any).getState = localStore.get.bind(localStore);
}
