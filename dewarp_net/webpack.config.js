const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      // Handle TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/],
      },
      // Handle our workers
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
      {
        test: /\.onnx$/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  output: {
    publicPath: "/dist/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/"),
    library: "DewarpNet",
    libraryTarget: "umd",
  },
  plugins: [
    /* Copy Plugin */
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/onnxruntime-web/dist/*.wasm",
          to: "[name][ext]",
        },

      ]
    }),
  ]
};