const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    clean: true,
    path: path.join(__dirname, "docs"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.(pdf|png|jpg|jpeg|gif|ico|mp3|fbx)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(glsl|vert|frag)$/,
        use: [
          {
            loader: "raw-loader",
            options: {},
          },
          {
            loader: "glslify-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@constants": path.resolve(__dirname, "src", "constants"),
      "@contexts": path.resolve(__dirname, "src", "contexts"),
      "@data": path.resolve(__dirname, "src", "data"),
      "@hooks": path.resolve(__dirname, "src", "hooks"),
      "@themes": path.resolve(__dirname, "src", "themes"),
      "@views": path.resolve(__dirname, "src", "views"),
      "@webgl": path.resolve(__dirname, "src", "webgl"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "template.html"),
      inject: true,
      containerId: "root",
      title: "sketch-020",
    }),
  ],
};
