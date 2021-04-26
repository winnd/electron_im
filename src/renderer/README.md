1. 初始化项目
    - npm init

2. 安装webpack
    - npm install -D webpack webpack-cli

3. 新建webpack配置文件
    - ./webpack.config.js

```
module.exports = {
    entry:'./index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

4. 运行
    - npx webpack

5. 1.安装vue3 2.修改webpack配置
    - npm install --save-dev vue@next vue-loader@next @vue/compiler-sfc
    - 在webpack.config.js的module.rules里添加loader和vue插件

6. 定义入口 './index.ts' import App from './App.vue' createApp(App).mount('#app'')

7. 开发App.vue 组件

8. 在'./index.html' 中增加 <div id='app'></div>

9. 使用config运行项目 -- ./node_modules/.bin/webpack --config webpack.config.js

10. 1.引入样式(scss) 2.并修改webpack设置 `-- npm install --save-dev style-loader sass-loader node-sass css-loader`
    在webpack.config.js的module.rules里添加 loader和vue

11. 引入图片 1.安装file-loader 2.修改webpack设置

12. babel是自动安装的









