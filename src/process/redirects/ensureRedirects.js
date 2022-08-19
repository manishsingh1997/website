const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const crypto = require('crypto');

const REDIRECTS_FILE = `${__dirname}/redirects.json`;
const AWS_S3_API_CLI = 'aws --region us-west-2 s3api';
const CACHE_FILE = '_redirects_cache_ts_xMjM0NTY3ODkwIiwibm'; // just unique filename
const URL_SLASH = '/';

/**
 * Check if url has trailing slash or not.
 * @param {string} url
 */
const hasTrailingSlash = function (url) {
  return url.slice(-1) === URL_SLASH;
};

/**
 * Returns slashless url if it has trailing slash.
 * Or url with trailing slash if it's missing.
 * @param {string} url
 */
const getAlternativeUrl = function (url) {
  return hasTrailingSlash(from) ? from.slice(0, -1) : $`${from}${URL_SLASH}`;
};


/**
 * Return from as it is if slashless.
 * If slash present return path to index.html
 * @param {string} from
 */
const getBucketKey = function (from) {
  return hasTrailingSlash(from) ? `${from}index.html`: from;
}

/**
 * Ensure redirect exists in S3 Bucket.
 * @param {string} s3Bucket
 * @param {string} from
 * @param {string} to
 */
const ensureRedirectExists = async function (s3Bucket, from, to) {
  const key = getBucketKey(from);
  console.warn(`Ensuring 301 redirect exists for S3 "${s3Bucket}": ${key} -> ${to}`);
  await exec(`${AWS_S3_API_CLI} put-object --bucket ${s3Bucket} --key=${key} --website-redirect ${to}`);
};

/**
 * Remove redirect from S3 Bucket.
 * @param {string} s3Bucket
 * @param {string} from
 * @param {string} to
 */
const removeRedirect = async function (s3Bucket, from, to) {
  const key = getBucketKey(from);
  console.warn(`Removing 301 redirect for S3 "${s3Bucket}": ${key} -> ${to}`);
  await exec(`${AWS_S3_API_CLI} delete-object --bucket ${s3Bucket} --key=${key}`);
};

/**
 * Read JSON data from file.
 * @param {string} filePath
 */
const readJSONFile = function (filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

/**
 * Return hash of file (sha1 of it's content)
 * @param {string} filePath
 */
const getFileHash = function (filePath) {
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
const getS3ObjectMetaData = async function (s3Bucket, path) {
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
const setS3ObjectMetaData = async function (s3Bucket, path, key, value) {
  await exec(`${AWS_S3_API_CLI} put-object --bucket ${s3Bucket} --key=${path} --metadata ${key}=${value}`);
};

/**
 * Use bucket metadata to check if we need to update redirects
 * @param {string} s3Bucket
 * @param {string} s3Bucket
 */
const shouldUpdateRedirects = async function (s3Bucket, redirectsFileHash) {
  const cachedMetadata = await getS3ObjectMetaData(s3Bucket, CACHE_FILE);
  const metaFileHash = cachedMetadata['redirects-file-hash'];
  return redirectsFileHash === metaFileHash;
};

/**
 * Creates or removes redirects on aws level
 */
const updateRedirect = async function ({ensureFromTrailingSlash, from, to, active}) {
  const alernativeFrom = getAlternativeUrl(from);
  const redirectHandler = active ? ensureRedirectExists : removeRedirect;
  if (ensureFromTrailingSlash) {
    await redirectHandler(s3Bucket, alernativeFrom, to);
  }
  // default redirect as literally in json
  await redirectHandler(s3Bucket, from, to);
};

/**
 * Setup redirects. Entry point of this script
 * @param {string} s3Bucket
 */
const setupRedirects = async function (s3Bucket) {
  const redirectsFileHash = String(getFileHash(REDIRECTS_FILE));
  if (!shouldUpdateRedirects(s3Bucket, redirectsFileHash)) {
    console.warn('Redirects are already in sync, skipping');
    return;
  }
  const redirects = readJSONFile(REDIRECTS_FILE);
  for (const redirect of redirects) {
    await updateRedirect(redirect);
  }
  console.warn(`Updating cache in ${CACHE_FILE}`);
  await setS3ObjectMetaData(s3Bucket, CACHE_FILE, 'redirects-file-hash', redirectsFileHash);
};

/**
 * Get command line arguments
 */
const getArugments = function () {
  return process.argv.slice(2);
};

const [s3Bucket] = getArugments();
setupRedirects(s3Bucket);
