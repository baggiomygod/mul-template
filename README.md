## webpack+ejs + jq or vue or react打包出传统页面应用

### 进度
    ok
    - npm run build   完成部分
    - stylus
    - MiniCssWecpackPlgin提取css
    - npm run dev

    warning
    - 提取公共js 未做
    - 加入ejs 未做(使模板可以复用)
    - 其他
### 依赖包及作用
    ##### webpack
    - webpack 4.16.1
    - html-webpack-plugin 个人理解为将打包的js和html进行绑定
    - style-loader 样式loader
    - css-loader 同上
    - url-loader 资源(img资源、media资源等)loader
    - postcss优化css + autoprefixer 自动添加前缀
    - expose-loader  require第三方库 require('jquery')

    ##### babel
    "babel-core": "^6.26.0",
    "babel-eslint": "^8.2.3",
    "babel-loader": "^7.1.4",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-stage-1": "^6.24.1"

    ### 其他
    cross-env： 修改NODE_ENV=production NODE_ENV=development

### 启动
   - 开发
   ```
    npm run dev
   ```
   - 发布
    ```
        npm run build
    ```
  - 格式化代码
  ```
    npm run lint-f
  ```


### three.js 参考
- webgl_geometry_normals.html
- webgl_lensflares.html
- webgl_postprocessing_nodes.html
