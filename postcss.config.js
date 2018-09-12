const autoprefixer = require('autoprefixer');

/* 1. css编译完成后通过postcss优化css;
   2. 这里postcss通过autoprefixer组件去优化编译好的css；
   3. autoprefixer 自动添加需要加前缀的css属性；
*/
module.exports = {
    plugins :[
        autoprefixer()
    ]
}
