const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {checkModules} = require('are-you-es5');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');

const SENTRY_DSN = 'https://f0fe1cc5aa2e4422bec8bbd637bba091@o147577.ingest.sentry.io/1794736';
let SENTRY_CONSOLE_LEVELS = "['warn', 'error', 'assert']";

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
if (process.env.NODE_ENV === 'production') {
  SENTRY_CONSOLE_LEVELS = "['error', 'assert']";
}

// Copy robots.txt file. It takes NODE_ENV into account. See CopyPlugin SEO section.
let robotsPath = `${APP_DIR}/process/robots/${process.env.NODE_ENV}.txt`;
if (!fs.existsSync(robotsPath)) {
  robotsPath = `${APP_DIR}/process/robots/default.txt`;
}

const modules = checkModules({
  path: './',
  checkAllNodeModules: true,
  ignoreBabelAndWebpackPackages: true,
});

/**
 * Will tell babel either or not to exclude module from transpile process.
 * WHY: Some of node modules are provided in es6 style, because of it website is not working
 * on old browsers, that's why we need to manually transpile them
 */
const excludeFn  = (path) => {
  const nonES5 = modules.es6Modules;

  // all @ergeon npm packages should be transpiled
  // google-maps should be also included to transpile, as
  // are-you-es5 cannot detect that it's non-es5 module, strange
  if (path.includes('@ergeon') || path.includes('google-maps')) {
    return false;
  }

  // list of non ES5 packages collected by are-you-es5 package
  if (nonES5.some(pkg => path.match(pkg))) {
    return false;
  }

  // other node_modules should not be transpiled as they are already es5 compatible
  return path.includes('node_modules');
};

module.exports = {
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
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: ['source-map-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        // transpile non es5 node_modules only on staging/prod to save time on development
        include: IS_DEVELOPMENT ? APP_DIR: [APP_DIR, /node_modules/],
        exclude: IS_DEVELOPMENT ? /node_modules/ : excludeFn,
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
              name: IS_DEVELOPMENT ? '[name].[ext]' : '[name]-[contenthash].[ext]',
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
      chunks: [
        'vendors~assets/bundle',
        'vendors~assets/bundle~utm/assets/bundle',
        'assets/bundle',
      ],
      favicon: `${APP_DIR}/assets/favicon.png`,
      filename: `${BUILD_DIR}/index.html`,
      environment: JSON.stringify(process.env.NODE_ENV),
      sentryConsoleLevels: SENTRY_CONSOLE_LEVELS,
      sentryDSN: JSON.stringify(SENTRY_DSN),
      sentryRelease: JSON.stringify(process.env.SENTRY_RELEASE_NAME || null),
      isProd: process.env.NODE_ENV === 'production',
    }),
    new htmlWebpackPlugin({
      template: `${APP_DIR}/utm/index.html`,
      chunks: [
        'utm/assets/bundle',
        'vendors~assets/bundle~utm/assets/bundle',
      ],
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
      {from: robotsPath, to: `${BUILD_DIR}/robots.txt`, force: true},
      {from: './src/data/sitemap.xml', to: `${BUILD_DIR}/`, force: true},
      {from: './src/data/gallery/sitemap.xml', to: `${BUILD_DIR}/gallery/`, force: true},
      {from: './src/data/help/sitemap.xml', to: `${BUILD_DIR}/help/`, force: true},
    ]),
    new CopyPlugin([
      {from: './src/manifest.webmanifest', to: `${BUILD_DIR}/`},
      {from: './src/assets/ergeon-logo.png', to: `${BUILD_DIR}/`},
    ]),
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
