const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const config = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// entry对象
const Entries = {};
// 插件数组
const HtmlPlugins = [];

config.pageNames.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: path.join(__dirname, `../src/page/${page}/html.js`),
    // chunkName集合，page为当前入口文件chunkName commons为公共模块chunkName
    chunks: [page, 'commons']
  });
  HtmlPlugins.push(htmlPlugin);
  Entries[page] = path.join(__dirname, `../src/page/${page}/${page}.js`);
});
module.exports = {
  entry: Entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'static': resolve('static')
    }
  },
  module: {
    rules: [
      {
        // 通过require('jquery')来引入
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          // 暴露出去的全局变量的名称 随便你自定义
          options: 'jQuery'
        },
        {
          // 同上
          loader: 'expose-loader',
          options: '$'
        }
        ]
      },
      {
        test: /\.(vue|js|jsx)/,
        loader: 'eslint-loader',
        exclude: /node_modules/, // 不检查这个文件
        include: [resolve('src')],
        enforce: 'pre' // pre预处理： 在使用其他loader处理文件之前都用eslint先检查一遍，避免文件编译后再检查;(post后处理)
      },
      {
        test: /\.jsx/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true // 开启缓存
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_nodules/
      },
      {
        // 对模版文件使用loader
        test: /\.tpl$|\.ejs$/,
        use: 'ejs-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // 标签+属性
          attrs: ['img:src', 'audio:src', 'video:src']
        }
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'static/[path][name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    ...HtmlPlugins,
    // new webpack.ProvidePlugin({ // 不适用这种方式打包jquery,script标签引入 加快打包速度
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),
    new CopyWebpackPlugin([{
      // 源文件目录
      from: path.join(__dirname, '../static'),
      // 目标目录 dist目录下
      to: 'static',
      // 筛选过滤，这里复制所有文件，连同文件夹
      ignore: ['.*']
    }])
  ]
}
