/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  context: __dirname,
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-optional-chaining",
            ]
          }
        }
      },
      {
        enforce: "pre",
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    ],
  },
  plugins: [new GasPlugin()],
};
