const baseWebpack = require('./webpack.config.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config');
const utils = require('./utils');
const path = require('path')

module.exports = merge(baseWebpack, {
    devtool: 'inline-source-map',
    devServer: {
      host: '0.0.0.0',
      contentBase: path.join(__dirname, '../dist'),
      hot: true,
      // 设置页面引入
      inline: true
    },
    module: {
      rules: utils.styleLoader(config.dev)
    },
    plugins: [
      // 区分开发环境和生产环境；DefinePlugin：相当于定义全局变量; 打包时，会根据process.env的值，引用框架代码的不同版本（开发版或生产环境版本）
      // 这里定义的process.env在开发中的js代码里可以访问到。
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('development')
          }
      }),
      // NamedModulesPlugin: 当开启 HMR 的时候使用“模块的相对路径作为模块的id“，建议用于开发环境
      // 加入前：return hotCreateRequire(0)
      // 加入后：return hotCreateRequire("./src/index.js")
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
  ]
});
