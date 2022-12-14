const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {BUILD_DIR, APP_DIR} = require('./constants');

const SENTRY_DSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@o147577.ingest.sentry.io/1794736';
let SENTRY_CONSOLE_LEVELS = "['warn', 'error', 'assert']";
if (process.env.NODE_ENV === 'production') {
  SENTRY_CONSOLE_LEVELS = "['error', 'assert']";
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Copy robots.txt file. It takes NODE_ENV into account. See CopyPlugin SEO section.
let robotsPath = `${APP_DIR}/process/robots/${process.env.NODE_ENV}.txt`;
if (!fs.existsSync(robotsPath)) {
  robotsPath = `${APP_DIR}/process/robots/default.txt`;
}

const srcAliases = {};
fs.readdirSync('./src', {withFileTypes: true})
  .filter(dir => dir.isDirectory())
  .forEach(dir => srcAliases[dir.name] = path.resolve(`./src/${dir.name}`));

module.exports = {
  experiments: {
    topLevelAwait: true,
  },
  entry: {
    'assets/bundle': `${APP_DIR}/index.js`,
    'utm/assets/bundle': `${APP_DIR}/utm/index.js`,
  },
  output: {
    path: BUILD_DIR,
    filename: IS_DEVELOPMENT ? '[name].js' : '[name]-[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\@ergeon).+(js|jsx)$/, // take source maps for @ergeon modules only
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
      fs: false,
      crypto: false,
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
    },
    roots: [path.resolve('./src')],
    modules: ['./node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      ...srcAliases,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      process: 'process/browser'
    },
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new htmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
      chunks: ['vendors~assets/bundle', 'vendors~assets/bundle~utm/assets/bundle', 'assets/bundle'],
      favicon: `${APP_DIR}/assets/favicon.png`,
      filename: `${BUILD_DIR}/index.html`,
      environment: JSON.stringify(process.env.NODE_ENV),
      enableSentry: !IS_DEVELOPMENT,
      sentryConsoleLevels: SENTRY_CONSOLE_LEVELS,
      sentryDSN: JSON.stringify(SENTRY_DSN),
      sentryRelease: JSON.stringify(process.env.SENTRY_RELEASE_NAME || null),
      isProd: process.env.NODE_ENV === 'production',
    }),
    new htmlWebpackPlugin({
      template: `${APP_DIR}/utm/index.html`,
      chunks: ['vendors~assets/bundle', 'vendors~assets/bundle~utm/assets/bundle', 'utm/assets/bundle'],
      filename: `${BUILD_DIR}/utm/index.html`,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SHOW_UPCOMING_FEATURES': JSON.stringify(process.env.SHOW_UPCOMING_FEATURES),
    }),
    new dotenv({
      path: './.env.local',
      defaults: `./.env.${process.env.NODE_ENV}`,
      expand: true,
    }),
    new CopyPlugin({ patterns: [
      {
        from: './node_modules/@ergeon/core-components/dist/assets',
        to: 'assets',
      },
    ]}),
    new CopyPlugin({ patterns: [
        {from: './node_modules/@ergeon/cad-3d-data/data', to: '3d-data'},
        {from: './node_modules/@ergeon/3d-lib/src/assets', to: 'assets'}
    ]}),
    new CopyPlugin({ patterns: [
      {from: `${APP_DIR}/monitoring/newrelic.js`, to: `${BUILD_DIR}/assets/`}]
    }),
    new CopyPlugin({patterns: [
      // SEO
      {from: robotsPath, to: `${BUILD_DIR}/robots.txt`, force: true},
      {from: './src/data/sitemap-index.xml', to: `${BUILD_DIR}/`, force: true},
      {from: './src/data/sitemap.xml', to: `${BUILD_DIR}/`, force: true},
      {from: './src/data/gallery-sitemap.xml', to: `${BUILD_DIR}/`, force: true},
      {from: './src/data/help-sitemap.xml', to: `${BUILD_DIR}/`, force: true},
    ]}),
    new CopyPlugin({patterns: [
      {from: './src/manifest.webmanifest', to: `${BUILD_DIR}/`},
    ]}),
    new MiniCssExtractPlugin({
      filename: IS_DEVELOPMENT ? '[name].css' : '[name]-[contenthash].css',
      chunkFilename: IS_DEVELOPMENT ? '[id].css' : '[id]-[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules\/(!@ergeon\/erg-utms)/,
          enforce: true,
        },
      },
    },
  },
};
