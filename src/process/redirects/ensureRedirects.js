const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const crypto = require('crypto');

const REDIRECTS_FILE = `${__dirname}/redirects.json`;
const AWS_S3_API_CLI = 'aws --region us-west-2 s3api';
const CACHE_FILE = '_redirects_cache_ts_xMjM0NTY3ODkwIiwibm';  // just unique filename

/**
 * Ensure redirect exists in S3 Bucket.
 * @param {string} s3Bucket
 * @param {string} from
 * @param {string} to
 */
const ensureRedirectExists = async function(s3Bucket, from, to) {
  console.warn(`Ensuring 301 redirect exists for S3 "${s3Bucket}": ${from} -> ${to}`);
  await exec(`${AWS_S3_API_CLI} put-object --bucket ${s3Bucket} --key=${from} --website-redirect ${to}`);
};

/**
 * Remove redirect from S3 Bucket.
 * @param {string} s3Bucket
 * @param {string} from
 * @param {string} to
 */
const removeRedirect = async function(s3Bucket, from, to) {
  console.warn(`Removing 301 redirect for S3 "${s3Bucket}": ${from} -> ${to}`);
  await exec(`${AWS_S3_API_CLI} delete-object --bucket ${s3Bucket} --key=${from}`);
};

/**
 * Read JSON data from file.
 * @param {string} filePath
 */
const readJSONFile = function(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

/**
 * Return hash of file (sha1 of it's content)
 * @param {string} filePath
 */
const getFileHash = function(filePath) {
  const rawData = fs.readFileSync(filePath);
  const shasum = crypto.createHash('sha1');
  shasum.update(rawData);
  return shasum.digest('hex');
};

/**
 * Return metadata of an object with given path in S3 bucket
 * @param {string} s3Bucket
 * @param {string} path
 */
const getS3ObjectMetaData = async function(s3Bucket, path) {
  try {
    const {stdout} = await exec(`${AWS_S3_API_CLI} head-object --bucket ${s3Bucket} --key=${path}`);
    const parsedResult = JSON.parse(stdout);
    return parsedResult['Metadata'];
  } catch (error) {
    return {};
  }
};

/**
 * Set metadata key=value for an object with given path in S3 bucket
 * @param {string} s3Bucket
 * @param {string} path
 * @param {string} key
 * @param {string} value
 */
const setS3ObjectMetaData = async function(s3Bucket, path, key, value) {
  await exec(`${AWS_S3_API_CLI} put-object --bucket ${s3Bucket} --key=${path} --metadata ${key}=${value}`);
};

/**
 * Setup redirects. Entry point of this script
 * @param {string} s3Bucket
 */
const setupRedirects = async function(s3Bucket) {
  // first check, do we have updates since last sync. If not - we can skip it.
  const cachedMetadata = await getS3ObjectMetaData(s3Bucket, CACHE_FILE);
  const redirectsFileHash = String(getFileHash(REDIRECTS_FILE));
  if (redirectsFileHash === cachedMetadata['redirects-file-hash']) {
    console.warn('Redirects are already in sync, skipping');
  } else {
    // Setup redirects
    const redirects = readJSONFile(REDIRECTS_FILE);
    for (const redirect of redirects) {
      if (redirect['active']) {
        await ensureRedirectExists(s3Bucket, redirect['from'], redirect['to']);
      } else {
        await removeRedirect(s3Bucket, redirect['from'], redirect['to']);
      }
    }
    // Update the cache
    console.warn(`Updating cache in ${CACHE_FILE}`);
    await setS3ObjectMetaData(s3Bucket, CACHE_FILE, 'redirects-file-hash', redirectsFileHash);
  }
};

/**
 * Get command line arguments
 */
const getArugments = function() {
  return process.argv.slice(2);
};

const [s3Bucket] = getArugments();
setupRedirects(s3Bucket);
