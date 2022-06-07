const fs = require('fs');
const path = require('path');

const {pick, zipObject, values} = require('lodash');

const {createDirIfNotExists} = require('../utils');
const {ASSETS_FOLDER_NAME} = require('./constants.json')
const {downloadAssets} = require('./downloadAssets');
const {authorize} = require('./drive');
const mapping = require('./mapping');
const {getCitySlug, parseSheet} = require('./parsing');

const SHEET_ID = '14w3hviutTV0xMgiamxqIPTsSMUWR01jCUdpJJsA3j3Q';
const SHEET_CITIES_DATA = 'City Multiproduct Page (template)!A1:AM103';
const SHEET_FENCES_DATA = 'City Fence Page (template)!A1:CY103';
const SHEET_NEIGHBORING_CITIES_DATA = 'Neighboring cities query!A1:D842';

const DATA_PATH = '../../data';

function getSheetsProcessor(sheets) {
  return async (tab, dataMapping, results) => {
    const sheet = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: tab,
    });
    return parseSheet(sheet, dataMapping, results);
  };
}

async function start() {
  console.log('parsing data…');

  // Get Sheets Google API
  const {sheets} = await authorize();
  const processSheet = getSheetsProcessor(sheets);

  // Process cities tab
  const citiesResults = await processSheet(SHEET_CITIES_DATA, mapping.city);

  // Process fences tab, merge with cities tab
  const results = await processSheet(SHEET_FENCES_DATA, mapping.product, citiesResults);

  // Save min data for the main page links
  const MINIFIED_FIELDS = ['city', 'county', 'state', 'slug'];
  const minifiedResults = results.map(city => pick(city, MINIFIED_FIELDS));
  let filePath = path.resolve(__dirname, `${DATA_PATH}/cities-min-data.json`);
  createDirIfNotExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(minifiedResults),);

  // Save full data in case of further processing needed
  filePath = path.resolve(__dirname, `${DATA_PATH}/cities-full-data.json`);
  createDirIfNotExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(results));

  // Save each city as JSON-data file.
  results.forEach(city => {
    filePath = path.resolve(__dirname, `${DATA_PATH}/cities/${city.slug}.json`);
    createDirIfNotExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(city));
  });
  console.log(`${results.length} cities data saved`);

  // Neighboring cities
  let neighboringResults = await processSheet(SHEET_NEIGHBORING_CITIES_DATA, mapping.neighboring);
  neighboringResults = neighboringResults.map(city => ({
    ...city,
    to_slug: getCitySlug({county: city.county, state: city.state, city: city.to_city}),
  }));
  filePath = path.resolve(__dirname, `${DATA_PATH}/cities-neighboring-data.json`);
  createDirIfNotExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(neighboringResults));

  // Neighboring cities minified
  const neighboringResultsMin = zipObject(
    neighboringResults.map(({slug}) => slug),
    neighboringResults.map(({to_slug}) => to_slug),
  );
  filePath = path.resolve(__dirname, `${DATA_PATH}/cities-neighboring-redirects-data.json`);
  createDirIfNotExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(neighboringResultsMin));
  console.log(`${neighboringResults.length} neighboring cities data saved`);

  console.log('downloading assets…');
  await downloadAssets();
  console.log('assets saved');
}
start();
