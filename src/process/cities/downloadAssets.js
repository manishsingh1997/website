const fs = require('fs');
const path = require('path');

const {get, last, some, values, uniq} = require('lodash');
const pngToJpeg = require('png-to-jpeg');

const {createDirIfNotExists} = require('../utils');
const {ASSETS_FOLDER_NAME} = require('./constants.json')
const {authorize} = require('./drive');
const mapping = require('./mapping');

const BASE_PATH = `../../../dist/${ASSETS_FOLDER_NAME}`;
const DATA_PATH = '../../data';

async function downloadAssets() {
  const cities = require(`${DATA_PATH}/cities-full-data.json`);

  // Workaround for module import
  // NOTE!: install imagemin-jpegoptim globally for this to work
  const {default: jpegOptimize} = await import('imagemin-jpegoptim');

  // Use Google Drive API to access files
  const {drive} = await authorize();

  // Collect all files IDs
  let files = [];

  // Grab all file IDs stored in Google Drive
  cities.forEach(city => {
    mapping.assets.forEach(p => {
      const value = get(city, p);
      if (!value) return;

      const docID = last(value.match(/file\/d\/([^/]+)/));
      if (!docID) return;

      files.push(docID);
    });
  });

  // No need to download duplicates
  files = uniq(files);
  console.log(`found ${files.length} unique files`);

  // Download, compress, and save files
  for (const file of files) {
    if (some([
      fs.existsSync(path.resolve(__dirname, `${BASE_PATH}/${file}.jpeg`)),
      fs.existsSync(path.resolve(__dirname, `${BASE_PATH}/${file}.pdf`)),
    ])) {
      console.log(`SKIPPING ${file}.jpeg`);
      continue;
    }

    try {
      const {data, headers: {'content-type': contentType}} = await drive.files.get(
        {fileId: file, alt: 'media'},
        {responseType: 'arraybuffer'},
      );
      let ext = contentType.toLowerCase().split('/')[1];

      let buffer = Buffer.from(data);
      if (ext === 'png') {
        buffer = await pngToJpeg({quality: 100})(buffer);
        ext = 'jpeg';
        console.log(`${file}.png -> ${file}.jpeg`);
      }
      if (ext === 'jpeg') {
        buffer = await jpegOptimize({
          progressive: true,
          stripAll: true,
          max: 60,
        })(buffer);
        console.log(`${file}.jpeg optimized`);
      }

      const fileName = path.resolve(__dirname, `${BASE_PATH}/${file}.${ext}`);
      createDirIfNotExists(fileName);
      fs.writeFileSync(fileName, buffer);

      console.log(`${file}.${ext} saved`);
    } catch(error) {
      console.warn(error);
    }
  }

  return files;
}

module.exports = {
  downloadAssets,
};
