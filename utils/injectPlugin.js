class ContentScriptInjectPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "ContentScriptInjectPlugin",
      (compilation, callback) => {
        var contentScriptContent = "";
        const fn = (content) => `
        try {
          const container = document.head || document.documentElement
          const scriptTag = document.createElement('script')
          scriptTag.setAttribute('async', 'false')
          scriptTag.textContent = ${JSON.stringify(content)};
          container.insertBefore(scriptTag, container.children[0])
          container.removeChild(scriptTag)
        } catch (e) {
          console.error('script injection failed.', e)
        }
      `;
        for (var filename in compilation.assets) {
          if (filename === "contentScript.bundle.js") {
            const asset = compilation.assets[filename];
            contentScriptContent = fn(asset.source());
          }
        }

        // Insert this list into the webpack build as a new file asset:
        compilation.assets["content.js"] = {
          source: function () {
            return contentScriptContent;
          },
          size: function () {
            return contentScriptContent.length;
          },
        };
        callback();
      }
    );
  }
}

module.exports = ContentScriptInjectPlugin;
