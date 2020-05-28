const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const BUILD_DIR = common.output.path;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    compress: true,
    contentBase: BUILD_DIR,
    disableHostCheck: false,
    historyApiFallback: true,
    public: 'ergeon.local:6600',
    host: '0.0.0.0',
    hot: true,
    open: true,
    port: 6600,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
