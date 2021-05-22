// 此文件用于分包，预编译处理
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash:8].dll.js',
        path: path.join(__dirname, 'library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[fullhash]',
            entryOnly: true,
            path: path.join(__dirname, 'library/[name].manifest.json'),
        })
    ]
}