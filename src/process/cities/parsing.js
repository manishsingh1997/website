const fs = require('fs');
const slugify = require('slugify');
const XLSX = require('xlsx');

const {isEmpty, isEqual, isString, keys, merge, pick, set, zipObject} = require('lodash');

const ID_FIELDS = ['city', 'county', 'state'];
const REPLACE_MATCHER_REGEX = /{([\w\s]+)\}/i;
const REPLACE_MATCHER_REGEX_GLOBAL = /{([\w\s]+)\}/gi;

function getParsedKey(path) {
  if (REPLACE_MATCHER_REGEX.test(path)) {
    return path.match(REPLACE_MATCHER_REGEX)[1];
  }
  return path;
}

function getParsedValue(source, value) {
  if (!isString(value)) return value;

  let valuePrepared = value.trim().replace(/\n$/, '');

  // This black magic just replaces all {…} with actual values, e.g.
  // ”The best {product} installation company in {city}” becomes
  // ”The best fence installation company in Los Altos”
  const matches = valuePrepared.matchAll(REPLACE_MATCHER_REGEX_GLOBAL);
  return [...matches].map(m => m[1]).reduce((result, match) => {
    return result.replace(`{${match}}`, source[match]);
  }, valuePrepared);
}

function getMappedObj(source, key, path) {
  const result = {};
  const parsedPath = path.map(pathPart => {
    const parsedPart = getParsedKey(pathPart);

    if (pathPart !== parsedPart) {
      return source[parsedPart];
    }
    return pathPart;
  });
  const value = getParsedValue(source, source[key]);
  if (!isEmpty(value)) {
    set(result, parsedPath, getParsedValue(source, source[key]));
  }
  return result;
}

function getCitySlug(city) {
  const citySlug = slugify(city.city, {lower: true, strict: true});
  const countySlug = slugify(city.county, {lower: true, strict: true});
  const slug = `${countySlug}-${citySlug}-${city.state.toLocaleLowerCase()}`;

  return slug;
}

function parseSheet(sheet, mapping, results = []) {
  let [header, ...data] = sheet.data.values;

  // Map row into object following the rules from imported mapping module.
  data.forEach(item => {
    let parsedRow = {};
    const row = zipObject(header, item);
    keys(row)
      .filter(key => !!mapping[key.trim()])
      .forEach(key => {
        parsedRow = merge(parsedRow, getMappedObj(row, key, mapping[key.trim()]));
      });
    const existingRowIdx = results.findIndex(obj => {
      return isEqual(pick(obj, ID_FIELDS), pick(parsedRow, ID_FIELDS));
    });
    if (existingRowIdx !== -1) {
      results[existingRowIdx] = merge(results[existingRowIdx], parsedRow);
    } else {
      results.push(parsedRow);
    }
  });

  // Return with slug.
  return results.map(city => {
    const slug = getCitySlug(city);
    return { ...city, slug };
  });
}

module.exports = {
  getCitySlug,
  getParsedKey,
  getParsedValue,
  getMappedObj,
  parseSheet,
}
