const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.config.base')
const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')

// CleanWebpackPlugin 删除文件配置
let pathsClean = ['dist']
let cleanOptions = {
  root: path.join(__dirname, '../'),
  exclude: [],
  verbose: true,
  dry: false
}
module.exports = merge(webpackBase, {
  devtool: 'souce-map',
  module: {
    rules: utils.styleLoader(config.prod)
  },
  plugins: [
    new CleanWebpackPlugin(pathsClean, cleanOptions),
    // 区分开发环境和生产环境；DefinePlugin：相当于定义全局变量; 打包时，会根据process.env的值，引用框架代码的不同版本（开发版或生产环境版本）
    // 这里定义的process.env在开发中的js代码里可以访问到。
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      DIST_TYPE: '"server"'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[id].[contenthash:8].css'
    })
  ]
})
