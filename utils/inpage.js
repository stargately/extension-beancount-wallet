const webpack = require("webpack");
const config = require("../webpack.config.inject");
const fs = require("fs");
const path = require("path");

module.exports = function (_, loaderContext) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stat) => {
      if (err) {
        reject(err);
        return;
      }
      fs.readFile(
        path.join(__dirname, "../build/injectedScript.bundle.js"),
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({
            code: `module.exports = { content: ${JSON.stringify(
              data.toString()
            )} } `,
          });
        }
      );
    });
  });
};
