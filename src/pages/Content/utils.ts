export function injectScript(content: string) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("async", "false");
    scriptTag.textContent = content;
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (e) {
    console.error("provider injection failed.", e);
  }
}
