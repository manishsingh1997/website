/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {dependencies} = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const VENDOR_LIST = Object.keys(dependencies).filter(vendor => vendor !== 'lodash');

var config = {
    devtool: 'source-map',
    entry: {
        'assets/bundle': APP_DIR + '/index.js',
        'assets/vendor': VENDOR_LIST,
        'utm/assets/bundle': APP_DIR + '/utm/index.js',
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[hash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test :/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'assets',
                        },
                    }
                ],
            },
        ],
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: BUILD_DIR,
        host: 'ergeon.local',
        compress: true,
        port: 6600,
        disableHostCheck: false,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: APP_DIR + '/index.html',
            chunks: ['assets/bundle', 'assets/vendor'],
            favicon: APP_DIR + '/assets/favicon.png',
            filename: BUILD_DIR + '/index.html',
        }),
        new htmlWebpackPlugin({
            template: APP_DIR + '/utm/index.html',
            chunks: ['utm/assets/bundle'],
            filename: BUILD_DIR + '/utm/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new CopyPlugin([
            {from: './node_modules/@ergeon/core-components/dist/assets', to: 'assets'}
        ]),
        new CopyPlugin([{ from: './node_modules/@ergeon/3d-lib/assets/3d-data', to: '3d-data' }]),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true,
                },
                data: {
                    chunks: 'initial',
                    name: 'data',
                    test: 'data',
                    enforce: true,
                },
            }
        },
    },
    resolve: {
        modules: ['./src', './node_modules'],
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;
