const {BUILD_DIR} = require('./constants');

module.exports = {
  mode: 'development',
  devServer: {
    allowedHosts: 'all',
    open: true,
    static: {
      directory: BUILD_DIR,
      staticOptions: {},
      publicPath: '/',
      serveIndex: true,
      watch: true,
    },
    compress: true,
    historyApiFallback: true,
    host: 'ergeon.local',
    port: 6600,
    hot: true,
  },
}
