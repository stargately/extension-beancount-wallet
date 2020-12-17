const path = require("path");

var alias = {
  "@": path.resolve("src"),
};

// load the secrets
const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    injectScript: path.join(
      __dirname,
      "src",
      "pages",
      "InjectedScript",
      "index.ts"
    ),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "injectedScript.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias,
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = options;
