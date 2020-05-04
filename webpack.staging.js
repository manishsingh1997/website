const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    moduleIds: 'hashed',
    occurrenceOrder: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
  },
});
