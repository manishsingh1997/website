// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Files with base tests setup
  setupFiles: [
    '<rootDir>/.jest/setupEnvVars.js',
  ],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'json-summary',
    'text',
    'lcov',
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/dist/', 'src/process/*'],

  modulePathIgnorePatterns: ['<rootDir>/dist'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/.jest/fileMock.js',
  },

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/fileTransformer.js',
  },

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation
  transformIgnorePatterns: [],

};
