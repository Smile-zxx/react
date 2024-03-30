//  webpack.dev.ts
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
module.exports = {
    target: 'web', // 默认打包成web平台的
    mode: 'production', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
    entry: path.resolve(__dirname, '../src/index.tsx'), // 文件的入口
    output: {
        filename: 'js/[name].[chunkhash:8].js', // 文件名
        path: path.resolve(__dirname, '../dist') // 文件输出地址

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader' // 处理ts和tsx文件
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader', // 处理js文件，尤其是JSX
                        options: {
                            // presets: ['@babel/preset-react']
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '项目',
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
            hash: true,
            cache: false,
            inject: true,
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true // 缩小CSS样式元素和样式属性
            },
            nodeModules: path.resolve(__dirname, '../node_modules')
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.css']
    }
}