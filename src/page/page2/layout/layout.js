// 布局组件
const layout = require('./layout.ejs'); // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构
const header = require('@/public-resource/components/base/html-header/html-header.ejs'); // 页头的模板
const footer = require('@/public-resource//components/base/html-footer/html-footer.ejs'); // 页头的模板
// 页面组件
const contentHeader = require('@/public-resource/components/common/header/header.ejs')
const contentFooter = require('@/public-resource/components/common/footer/footer.ejs')

const pf = {
  pageTitle: 'title name'
  // constructInsideUrl: noJquery.constructInsideUrl,
};
const moduleExports = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
  init({ pageTitle }) {
    pf.pageTitle = pageTitle; // 比如说页面名称，会在<title>或面包屑里用到
    return this;
  },

  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  run(content) {
    const componentRenderData = Object.assign({}, pf); // 页头组件需要加载css/js等，因此需要比较多的变量
    const renderData = {
      header: header(componentRenderData),
      footer: footer(),
      contentHeader: contentHeader({page: 'page2'}),
      contentFooter: contentFooter(),
      content: content()
    };
    return layout(renderData);
  }
};

export default moduleExports;
