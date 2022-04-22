/* eslint-disable */

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["**/src/process/(*.)+(spec|test).[tj]s?(x)"],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'json-summary',
    'text',
    'lcov',
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/src/process/(*.)+(spec|test).[tj]s?(x)"
  ],

  // A map from regular expressions to paths to transformers
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
