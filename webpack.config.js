const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');
const productionConfig = require('./webpack/webpack.prod');
const stagingConfig = require('./webpack/webpack.staging');
const devConfig = require('./webpack/webpack.dev');

switch (process.env.NODE_ENV) {
  case 'development': {
    module.exports = merge(commonConfig, devConfig);
    break;
  }
  case 'staging': {
    module.exports = merge(commonConfig, stagingConfig);
    break;
  }
  case 'production': {
    module.exports = merge(commonConfig, productionConfig);
    break;
  }
}
