const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const createElectronReloadWebpackPlugin = require("electron-reload-webpack-plugin");

const FileCopy = new CopyWebpackPlugin([
  {
    from: "./src/index.html",
    to: "",
  },
]);

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: "./",
});

var main = {
  mode: "development",
  target: "electron-main",
  entry: path.join(__dirname, "src", "main.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        include: [path.resolve(__dirname, "src")],
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    ElectronReloadWebpackPlugin(),
    new FilterWarningsPlugin({
      exclude: [
        /mongodb/,
        /mssql/,
        /mysql/,
        /mysql2/,
        /oracledb/,
        /pg/,
        /pg-native/,
        /pg-query-stream/,
        /react-native-sqlite-storage/,
        /redis/,
        /sqlite3/,
        /sql.js/,
        /typeorm-aurora-data-api-driver/,
      ],
    }),
    FileCopy,
  ],
  externals: [nodeExternals()],
};

var renderer = {
  mode: "development",
  target: "electron-renderer",
  entry: path.join(__dirname, "src", "renderer", "app.tsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "scripts"),
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [{ loader: "react-svg-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css", ".ts", ".tsx"],
  },
  externals: [nodeExternals()],
  plugins: [ElectronReloadWebpackPlugin()],
};

module.exports = [main, renderer];
