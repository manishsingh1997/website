const path = require('path');

const testEnv = require('dotenv').config({ path: path.resolve('./.env.test') });

process.env = {
  ...process.env,
  ...testEnv.parsed,
};
