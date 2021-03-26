const {merge} = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const devConfig = {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        contentBase: './dist',
        openPage: 'app/index.html',
        stats: {
            // 控制开发环境的控制台打印信息
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            timings: false,
            errors: true,
            env: false,
            version: false,
            hash: false
        }
    },
    devtool: 'source-map',
}
module.exports = merge(baseConfig, devConfig)