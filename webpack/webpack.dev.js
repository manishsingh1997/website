const webpack = require('webpack');
const {BUILD_DIR} = require('./constants');

module.exports = {
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
