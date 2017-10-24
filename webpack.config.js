const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const root = path.resolve(__dirname);

module.exports = {
    entry: {
        app: path.join(root, './src/index.js')
    },
    output: {
        path: root,
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['env'],
                plugins: ["transform-runtime"]
            }
        }, {
            test: /.(gif|png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: '[name].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        },
        extensions: ['*', '.js', '.vue']
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: path.join(root, 'index.html'),
            template: path.join(root, './src/index.html'),
            inject: 'body'
        })
    ]
}