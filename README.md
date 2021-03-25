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
5. ```npm i postcss-loader postcss postcss-preset-env -D ```自动补全css前缀
6. ```npm i px2rem-loader -D``` 移动端px自动转换为rem
7. 抽取公共的css使用```npm i mini-css-extract-plugin -D```
   配合postcss使用方式如下：
   ``` 
   {
        test: /.less$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            ["postcss-preset-env"]
                        ]
                    },
                }
            },
            'less-loader', 
        ]
    } 
    ```

## 配置热更新
1. 可以配置启动命令```webpack-dev-server --open``` --open表示每次更新完成会自动打开浏览器, 需要搭配webpack.HotModuleReplacementPlugin插件
2. 多页应用打包方案 使用 ```npm i glob -D ```

## 优化构建日志
1. stats 设置成 errors-only
2. ```npm i friendly-errors-webpack-plugin -D```进行命令行构建日志的优化



## 配置通用的webpack