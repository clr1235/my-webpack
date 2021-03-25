const path = require('path')
const glob = require('glob');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理构建目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
                // 会将默认生成的index.html放到 对应的出口目录下
                filename: `${pageName}/index.html`,
                chunks: [pageName],
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
        filename: '[name]/[chunkhash:8].js'
    },
    // loaders
    module: {
        rules: [{
            test: /.js|jsx$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                {
                    loader: 'postcss-laoder',
                    options: {
                        plugins: () => {
                            autoprefixer({
                                browsers: ['last 2 version', '>1%', 'ios 7'],
                            })
                        }
                    }
                } 
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    stats: 'errors-only'
}





