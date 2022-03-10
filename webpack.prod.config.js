/* eslint-disable @typescript-eslint/no-var-requires */
const common = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const path = require("path");


const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: "[name][chunkhash:8].js",
    path: path.resolve(__dirname, "./dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      // maxSize 每个包的最大 250000 字节
      maxSize: 250000,
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },

  // performance: {
  //   hints: "error",
  //   // 打包之后的文件的大小超过 250000 字节报错提示
  //   maxAssetSize: 250000,
  //   // 首次加在文件的大小
  //   maxEntrypointSize: 400000,
  // },
});

