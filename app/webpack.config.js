const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.MODE,
  devtool: "eval-cheap-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(
      {
        "process.env.MODE": JSON.stringify(process.env.MODE)
      }
    )
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@public": path.resolve(__dirname, "public"),
      "@layouts": path.resolve(__dirname, "src", "layouts"),
      "@hooks": path.resolve(__dirname, "src", "hooks"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@routes": path.resolve(__dirname, "src", "routes"),
      "@stores": path.resolve(__dirname, "src", "stores"),
      "@services": path.resolve(__dirname, "src", "services"),
      "@http": path.resolve(__dirname, "src", "http"),
      "@translations": path.resolve(__dirname, "src", "translations"),
      "@entities": path.resolve(__dirname, "src", "entities"),
      "@dtos": path.resolve(__dirname, "src", "dtos"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@utils": path.resolve(__dirname, "src", "utils")
    }
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          "sass-loader"]
      },
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[local]--[hash:base64:5]", },
            }
          },
          "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  devServer: {
    port: process.env.DEV_PORT,
    historyApiFallback: true
  },
}