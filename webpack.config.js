'use strict';

const path = require('path')

module.exports = {
    // 入口文件
    entry: {
        home: './src/index.js',
        app: './src/app.js'
    },
    // 出口
    output: {
        // 输出文件的路径
        path: path.join(__dirname, 'dist'),
        // 输出的文件名
        filename: '[name].js'
    },
    // 环境
    mode: 'production',
    // loaders
    module: {
        rules: [{
            test: /.js$/,
            use: 'babel-loader'
        }]
    }
}