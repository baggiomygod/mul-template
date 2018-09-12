const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const staticDir = 'static'

// 以 posix 兼容的方式交互
exports.assetsPath = _path => path.posix.join(staticDir, _path)

exports.styleLoader = (options) => {
  options = options || {}

  // 固定的两个loader
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      minimize: true
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  /**
   * 生成 {test: xxx, use: [...]}的方法
   * @param {*} loader
   */
  function generateLoaders(loader) {
    const loaders = [cssLoader, postcssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          sourceMap: options.sourceMap
        }
      })
    }

    // 是否需要提取样式
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    }
    return ['style-loader'].concat(loaders)
  }

  const loaders = {
    css: generateLoaders(),
    less: generateLoaders('less'),
    scss: generateLoaders('scss'),
    sass: generateLoaders('sass'),
    styl: generateLoaders('stylus'),
    stylus: generateLoaders('stylus')
  }

  const output = []
  for (const key in loaders) {
    const loader = loaders[key]
    loaderOption = {
      test: new RegExp(`\\.${key}$`),
      use: loader
    }
    output.push(loaderOption)
  }
  return output
}
