① 初始化项目
    -- npm init

② 安装webpack
    -- npm install -D webpack webpack-cli

③ 新建webpack配置文件
    -- ./webpack.config.js

```
module.exports = {
    entry:'./index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

④ 运行
    -- npx webpack

⑤ 1.安装vue3 2.修改webpack配置
    -- npm install --save-dev vue@next vue-loader@next @vue/compiler-sfc
    在webpack.config.js的module.rules里添加loader和vue插件

⑥ 定义入口 './index.js'
    import App from './App.vue'
    createApp(App).mount('#app'')

⑦ 开发App.vue 组件

⑧ 在'./index.html' 中增加 <div id='app'></div>

⑨ 使用config运行项目
    -- ./node_modules/.bin/webpack --config webpack.config.js

⑩ 1.引入样式(scss) 2.并修改webpack设置
    -- npm install --save-dev style-loader sass-loader node-sass css-loader
    在webpack.config.js的module.rules里添加 loader和vue

⑪ 引入图片 1.安装file-loader 2.修改webpack设置

⑫ babel是自动安装的









