/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const WebpackBar = require("webpackbar");
const HappyPack = require("happypack");
const webpack = require("webpack");

// 移动端适配
const postcssPxToViewport = require("postcss-px-to-viewport");

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const os = require("os");

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  target: "web",
  // output: {
  //   filename: "[name][chunkhash:8].js",
  //   path: path.resolve(__dirname, "./dist"),
  // },
  resolve: {
    extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src/services/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@component": path.resolve(__dirname, "src/components"),
      "@component/*": path.resolve(__dirname, "src/components/*"),
      "@constant": path.resolve(__dirname, "src/constant"),
      "@constant/*": path.resolve(__dirname, "src/constant/*"),
      // "@stores": path.resolve(__dirname, "stores"),
      "@util": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@hooks/*": path.resolve(__dirname, "src/hooks/*"),
      "@router": path.resolve(__dirname, "src/router"),
      "@router/*": path.resolve(__dirname, "src/router/*"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "happypack/loader?id=babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
          // 配置相关移动端 VW 布局
          {
            loader: "postcss-less-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssPxToViewport({
                  viewportWidth: 750, // (Number) The width of the viewport.
                  viewportHeight: 1334, // (Number) The height of the viewport.
                  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                  viewportUnit: "vw", // (String) Expected units.
                  selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
                  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                  mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
                }),
              ],
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new WebpackBar({
      name: "Link Startou!!!",
      color: "#52c41a",
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      id: "babel-loader",
      loaders: [
        {
          loader: "babel-loader",
          options: { cacheDirectory: true },
        },
      ],
      threadPool: happyThreadPool,
    }),
    // new webpack.ProvidePlugin({ 'window.abcEnv': 'local'})
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8888,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info',
    // }),
    // // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     configFile: path.resolve(__dirname, "tsconfig.json"),
    //   },
    // }),
  ],
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
