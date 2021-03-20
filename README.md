# 流程步骤
## 初始化
1. 运行 ```npm init -y``` 生成初始的package.json文件（-y表示所有的都选则默认）
2. 安装webpack ```npm i webpack webpack-cli --save-dev```
3. 创建webpack.config.js文件
4. 牛刀小试 在package.json文件的scripts下配置 build打包命令
## 安装需要用到的包
注意：loader是链式调用，执行顺序是从右到左
1. 解析es6 ```npm i @babel/core @babel/preset-env babel-loader -D``` -D是 --save-dev的缩写
2. 创建.babelrc文件
3. 解析react jsx语法 ```npm i @babel/preset-react -D```
4. 解析css ```npm i css-loader style-loader -D```
5. ```npm i postcss-loader autoprefixer -D ```自动补全css前缀
6. ```npm i px2rem-loader -D``` 移动端px自动转换为rem

## 配置热更新
1. 可以配置启动命令```webpack-dev-server --open``` --open表示每次更新完成会自动打开浏览器, 需要搭配webpack.HotModuleReplacementPlugin插件
2. 多页应用打包方案 使用 ```npm i glob -D ```