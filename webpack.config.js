const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const webpack = require("webpack");

const devMode = process.env.NODE_ENV !== "production";
const basePath = path.resolve(__dirname, "dist");

let plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[hash].css"
  }),
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new OptimizeCssAssetsWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new CleanWebpackPlugin(),
]

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

if (devMode) {
  plugins.concat(devPlugins);
}

const config = {
  entry: [
    "./src/scripts/index.ts",
    "./src/styles/styles.scss"
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: "main.[hash].js",
    path: basePath,
  },
  devtool: devMode ? "eval-source-map" : "none",
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ 
          loader: "ts-loader",
          options: { transpileOnly: true } // Typechecking done in separate thread via ForkTsChecker
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { 
            loader: "css-loader",
            options: { sourceMap: devMode }
          },
          { 
            loader: "sass-loader",
            options: { sourceMap: devMode }
          },
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "./fonts/",
            name: "[name].[ext]"
          }
        }]
      }
    ]
  },
  devServer: {
    port: 1337,
    hot: true
  }
}

module.exports = config;