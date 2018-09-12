import content from './page2.ejs'
import layout from './layout/layout'
export default layout.init({
  pageTitle: 'page2'
}).run(content)
