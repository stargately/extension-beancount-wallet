import extension from "extensionizer";

function checkForError() {
  const { lastError } = extension.runtime;
  if (!lastError) {
    return undefined;
  }
  if (lastError.message) {
    return lastError;
  }
  return new Error(lastError.message);
}

export function openTab(options: extension.tabs.CreateProperties) {
  return new Promise((resolve, reject) => {
    extension.tabs.create(options, (newTab) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(newTab);
    });
  });
}

export function openWindow(options: extension.windows.CreateData) {
  return new Promise((resolve, reject) => {
    extension.windows.create(options, (newWindow) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(newWindow);
    });
  });
}

export function openExtensionInBrowser(route = "/") {
  let extensionURL = extension.runtime.getURL("popup.html");

  if (route) {
    extensionURL += `#${route}`;
  }
  openWindow({ url: extensionURL, type: "popup", width: 360, height: 600 });
}
