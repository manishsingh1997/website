module.exports = {
  presets: [
    ['@babel/preset-env', {'corejs': '2', 'useBuiltIns': 'entry'}],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-block-scoping',
    ['@babel/plugin-transform-classes', {
      'loose': true,
    }],
    'lodash',
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-jsx-remove-data-test-id',
      ]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    },
    jestNode: {
      plugins: [
        '@babel/plugin-transform-runtime',
        [
          './src/process/babel-plugin-nullify-import.js',
          {
            pathPattern: 'components|containers',
          },
        ],
      ],
    }
  },
};
