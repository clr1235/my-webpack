const {merge} = require('webpack-merge')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
    mode: 'production',
    optimization: {
        // 提取公共模块 包括第三方库和自定义工具库
        splitChunks: {
            minSize: 0,
            chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            cacheGroups: {
                // styles: {
                //     name: 'prod',
                //     test: /\.(css|less|scss)/,
                //     chunks: 'all',
                //     enforce: true,
                //     // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                //     reuseExistingChunk: true
                // },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    reuseExistingChunk: true
                },
                vendors: {  // 抽离第三方库
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                utilCommon: { // 抽离自定义工具库
                    name: "common",
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20
                }
            }
        },
        runtimeChunk: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // 开启/禁用多进程并发运行功能 并发运行的默认数量：os.cpus().length - 1,
                // 可以直接跟数字，进行并发运行数量的设置
                parallel: true,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        pure_funcs: ['console.log', 'debugger'] // 移除console
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    }
                }
            }),
        ]
    },
    //添加 stats 配置过滤打包时出现的一些统计信息。
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    

}

module.exports = merge(baseConfig, prodConfig)