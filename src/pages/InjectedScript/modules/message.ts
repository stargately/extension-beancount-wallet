export function postMessage(data: any) {
  window.postMessage(data, "*");
}
