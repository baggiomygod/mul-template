import content from './page1.ejs'
import layout from './layout/layout'
export default layout.init({
  pageTitle: 'page1'
}).run(content)
