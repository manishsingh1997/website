module.exports = {
  'presets': [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    'lodash',
    ['module-resolver', {
      'root': ['./src'],
    }],
  ],
  'env': {
    'sitemap': {
      'plugins': [
        ['./src/process/babel-plugin-nullify-import.js', {
          'pathPattern': 'components|containers',
        }],
      ],
    },
    'test': {
      'plugins': [
        '@babel/plugin-transform-runtime',
        // Ignore in Jest sitemaps testing too
        ['./src/process/babel-plugin-nullify-import.js', {
          'pathPattern': 'components|containers',
        }],
      ],
    },
  },
};
