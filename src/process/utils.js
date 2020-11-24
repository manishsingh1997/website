const fs = require('fs');
const path = require('path');

/**
 * Helper function to recursively created nested dirs.
 * @param {string} filePath
 */
const createDirIfNotExists = filePath => {
  try {
    fs.mkdirSync(path.dirname(filePath));
  } catch (err) {
    // Directory exists
  }
};

module.exports = {
  createDirIfNotExists,
};
