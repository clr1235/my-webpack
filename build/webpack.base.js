const path = require('path')
const glob = require('glob');
// 分析打包体积
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理构建目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack5.0 自动会调用此插件 导致默认生成.LICENSE.txt后缀的文件
const TerserPlugin = require('terser-webpack-plugin')


// 配置通用的多页面应用入口，以及自动生成相应的html页面
// process.cwd()方法会返回 Node.js 进程的当前工作目录
const projectRoot = process.cwd()
const configEntry = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(projectRoot, 'src/*/index.js'))
    Object.keys(entryFiles).forEach((index) => {
        // 配置入口
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        // 配置对应的自动生成html
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                // 使用自定义模版
                template: path.join(projectRoot, `src/${pageName}/index.html`),
                // 会将默认我们自定义的模版插入打包的css和js,重命名为index.html 并将其放到对应的出口目录下
                filename: `${pageName}/index.html`,
                chunks: [pageName, "commons", "vendors", "common"],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry, htmlWebpackPlugins} = configEntry()

module.exports = {
    // 入口文件
    entry,
    // 出口
    output: {
        // 输出文件的路径
        path: path.join(projectRoot, `dist`),
        // 会将打包文件分别放到name目录下
        filename: '[name]/js/[chunkhash:8].js'
    },
    // loaders
    module: {
        rules: [{
            test: /.js|jsx$/,
            exclude: /node_modules/,
            use: 'babel-loader?cacheDirectory=true'
        }, {
            test: /.css$/i,
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
            ]
        }, {
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
        }, {
            test: /\.(png|jpg|jpeg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: false,
                    name: '[name]_[contenthash:8].[ext]',
                    outputPath: './assets/img'
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:8].[ext]',
                    outputPath: './assets/fonts'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/css/[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        // 开启 BundleAnalyzerPlugin 
        // new BundleAnalyzerPlugin(), 
    ].concat(htmlWebpackPlugins),
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true, // 使用多进程并发构建，默认是true
            })
        ]
    },
    stats: 'errors-only'
}






