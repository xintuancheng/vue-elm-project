const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '../');
const srcPath = path.join(rootPath, 'src');
const entryPath = path.join(srcPath, 'main.js');
const outpath = path.join(rootPath, 'build');

const config = {
    entry: {
        'app': entryPath
    },
    output: {
        filename: '[name].js',
        path: outpath,
        publicPath: ''
    },
    devtool: "inline-source-map",
    resolve: {
        alias: {
            'util': path.join(srcPath, 'util'),
            'api': path.join(srcPath, 'service/api/index')
        },
        extensions: [".vue", ".js", ".less", ".css", '.svg']
    },
    externals: {
        "vue": "Vue",
        "vuex": "Vuex"
    },
    devServer: {
        host: 'localhost',
        port: 3300,
        contentBase: outpath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: srcPath,
                exclude: /(node_modules)/
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /(node_modules)/,
                include: srcPath
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: rootPath, //一个根的绝对路径.
            verbose: true, //将log写到 console.
            dry: true //不要删除任何东西，主要用于测试.
        }),
        //提取公共代码插件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: '[name].[hash:8].js',
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            title: 'hello vue',
            template: 'index.hbs',
            filename: 'app.html'
        })
    ]
}

module.exports = config;