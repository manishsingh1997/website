const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {dependencies} = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const VENDOR_LIST = Object.keys(dependencies).filter(
  (vendor) => vendor !== 'lodash'
);

const SENTRY_DSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@o147577.ingest.sentry.io/1794736';
let SENTRY_CONSOLE_LEVELS = "['warn', 'error', 'assert']";
if (process.env.NODE_ENV === 'production') {
  SENTRY_CONSOLE_LEVELS = "['error', 'assert']";
}

module.exports = {
  entry: {
    'assets/bundle': `${APP_DIR}/index.js`,
    'assets/vendor': VENDOR_LIST,
    'utm/assets/bundle': `${APP_DIR}/utm/index.js`,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name]-[hash].js.map',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['./node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  plugins: [
    new htmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
      chunks: ['assets/bundle', 'assets/vendor'],
      favicon: `${APP_DIR}/assets/favicon.png`,
      filename: `${BUILD_DIR}/index.html`,
      environment: JSON.stringify(process.env.NODE_ENV),
      sentryConsoleLevels: SENTRY_CONSOLE_LEVELS,
      sentryDSN: JSON.stringify(SENTRY_DSN),
      sentryRelease: JSON.stringify(process.env.SENTRY_RELEASE_NAME),
      isProd: process.env.NODE_ENV === 'production',
    }),
    new htmlWebpackPlugin({
      template: `${APP_DIR}/utm/index.html`,
      chunks: ['utm/assets/bundle'],
      filename: `${BUILD_DIR}/utm/index.html`,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SHOW_UPCOMING_FEATURES': JSON.stringify(process.env.SHOW_UPCOMING_FEATURES),
    }),
    new CopyPlugin([
      {
        from: './node_modules/@ergeon/core-components/dist/assets',
        to: 'assets',
      },
    ]),
    new CopyPlugin([
      {from: './node_modules/@ergeon/3d-lib/assets/3d-data', to: '3d-data'},
      {from: './node_modules/@ergeon/3d-lib/assets',
        to: 'assets',
        ignore: ['3d-data/*'],
      },
    ]),
    new CopyPlugin([
      {from: `${APP_DIR}/monitoring/newrelic.js`, to: `${BUILD_DIR}/assets/`},
    ]),
    new CopyPlugin([ // SEO
      {from: './src/robots.txt', to: `${BUILD_DIR}/`},
      {from: './src/data/sitemap.xml', to: `${BUILD_DIR}/`},
      {from: './src/data/gallery/sitemap.xml', to: `${BUILD_DIR}/gallery/`},
      {from: './src/data/help/sitemap.xml', to: `${BUILD_DIR}/help/`},
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
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
      },
    },
  },
};
