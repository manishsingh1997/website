module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-classes',
    'lodash',
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
  ],
  env: {
    sitemap: {
      plugins: [
        [
          './src/process/babel-plugin-nullify-import.js',
          {
            pathPattern: 'components|containers',
          },
        ],
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
        // Ignore in Jest sitemaps testing too
        [
          './src/process/babel-plugin-nullify-import.js',
          {
            pathPattern: 'components|containers',
          },
        ],
      ],
    },
  },
};
