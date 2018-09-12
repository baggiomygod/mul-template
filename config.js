module.exports = {
  pageNames: [
    // 'detail',
    // 'portal_new', // 首页
    // 'wisdom-fusion', // 智慧融合
    // 'msh', // 全息感知
    // 'data-supervision' // 数据监管

    'page1',
    'page2'
  ],
  dev: {
    sourceMap: true,
    extract: false,
    host: '0.0.0.0',
    port: '8070'
  },
  prod: {
    sourceMap: false,
    extract: true
  }
}
