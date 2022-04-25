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
    [
      './babel-plugin-nullify-import.js',
      {
        pathPattern: 'components|containers',
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
        // Ignore in Jest sitemaps testing too
        [
          './babel-plugin-nullify-import.js',
          {
            pathPattern: 'components|containers',
          },
        ],
      ],
    },
  },
};
