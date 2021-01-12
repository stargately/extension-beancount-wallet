// @ts-nocheck
import LocalMessageDuplexStream from "post-message-stream";
import PortStream from "extension-port-stream";
import ObjectMultiplex from "obj-multiplex";
import pump from "pump";
import extension from "extensionizer";

// @ts-nocheck
import { content } from "../../../utils/inpage";

function forwardTrafficBetweenMuxers(channelName, muxA, muxB) {
  const channelA = muxA.createStream(channelName);
  const channelB = muxB.createStream(channelName);
  pump(channelA, channelB, channelA, (err) =>
    logStreamDisconnectWarning(
      `Beancount muxed traffic for channel "${channelName}" failed.`,
      err
    )
  );
}

/**
 * Error handler for page to extension stream disconnections
 *
 * @param {string} remoteLabel - Remote stream name
 * @param {Error} err - Stream connection error
 */
function logStreamDisconnectWarning(remoteLabel, err) {
  let warningMsg = `BeancountContentscript - lost connection to ${remoteLabel}`;
  if (err) {
    warningMsg += `\n${err.stack}`;
  }
  console.warn(warningMsg);
}

async function injectScript(content) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("async", "false");
    scriptTag.textContent = content;
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (e) {
    console.error("Beancount provider injection failed.", e);
  }
}

async function setupStreams() {
  const pageStream = new LocalMessageDuplexStream({
    name: "contentscript",
    target: "inpage",
  });
  const extensionPort = extension.runtime.connect({ name: "contentscript" });
  const extensionStream = new PortStream(extensionPort);

  // create and connect channel muxers
  // so we can handle the channels individually
  const pageMux = new ObjectMultiplex();
  pageMux.setMaxListeners(25);
  const extensionMux = new ObjectMultiplex();
  extensionMux.setMaxListeners(25);

  pump(pageMux, pageStream, pageMux, (err) =>
    logStreamDisconnectWarning("Beancount Inpage Multiplex", err)
  );
  pump(extensionMux, extensionStream, extensionMux, (err) =>
    logStreamDisconnectWarning("Beancount Background Multiplex", err)
  );

  // forward communication across inpage-background for these channels only
  forwardTrafficBetweenMuxers("signer", pageMux, extensionMux);
}

async function start() {
  await setupStreams();
  await injectScript(content);
}

start();
