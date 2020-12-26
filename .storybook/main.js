const custom = require("../webpack.config");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
            sourceMap: true,
          },
        },
      ],
    });
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...custom.resolve.alias,
      },
    };
    return config;
  },
};
