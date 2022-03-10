/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const common = require("./webpack.base.config");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: '/', // require
  },
  target: "web",

  devServer: {
    host: "localhost",
    port: 6008,
    inline: true,
    stats: "errors-only",
    clientLogLevel: "none",
    compress: true,
    open: false,
    hot: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   // 使用正则匹配命中路由
    //   rewrites: [
    //     // // /user 开头的都返回 user.html
    //     // { from: /^\/user/, to: '/user.html' },
    //     // { from: /^\/game/, to: '/game.html' },
    //     // 其它的都返回 index.html
    //     { from: /./, to: '/index.html' },
    //   ]
    // },
    noInfo: true,
    proxy: {
      "/user/api": {
        target: "https://api.linkto.xin",
        secure: true,
        changeOrigin: true,
      },
      "/bot": {
        target: "https://api.linkto.xin",
        secure: true,
        changeOrigin: true,
      },
      "/gro": {
        target: "https://api.linkto.xin",
        secure: true,
        changeOrigin: true,
      },
      "/pdf": {
        target: "https://vicilemon-test.codoclub.com",
        secure: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public", "mockServiceWorker.js"),
          to: "mockServiceWorker.js",
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    // splitChunks: {
    //   chunks: "all",
    //   minSize: 30000,
    //   maxSize: 30000,
    //   maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
    //   maxInitialRequests: 5, // 最大初始化请求数
    //   cacheGroups: {
    //     vendors: {
    //       name: 'chunk-vendors',
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial', // 只打包初始时依赖的第三方
    //     },
    //     'async-commons': { // 异步加载公共包、组件等
    //       chunks: 'async',
    //       minChunks: 2,
    //       name: 'async-commons',
    //       priority: 10,
    //     },
    //     moment: {
    //       name: 'chunk-moment',
    //       priority: 20,
    //       test: /(moment)/,
    //     },
    //     antd: {
    //       name: 'chunk-antd', // 单独将 antDesign 拆包
    //       priority: 20,
    //       test: /(antd|react|react-dom|react-dom-router|lodash)/,
    //     },
    //     commons: {
    //       name: 'chunk-commons',
    //       minChunks: 2, // 最小公用次数
    //       priority: -20,
    //       reuseExistingChunk: true,
    //       maxInitialRequests: 5,
    //     },
    //   },
    // },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
});
