const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const CSVFilePath = path.resolve(__dirname, '../data/geotargets/cities-data.csv');
const JSONFilePath = path.resolve(__dirname, '../data/geotargets/cities-data.json');

const SUPPORTED_STATES = {
  California: 'CA',
  Georgia: 'GA',
  Texas: 'TX',
};

csv()
  .fromFile(CSVFilePath)
  .then(jsonData => {
    const data = {};
    jsonData
      .filter(geotarget => {
        return !!SUPPORTED_STATES[geotarget.State];
      })
      .forEach(geotarget => {
        const id = geotarget['Criteria ID'];
        const [_match, city, county] = geotarget.City.match(/([^(]+)(\([^)]+\))?/);

        data[id] = {
          id,
          city: city.trim(),
          county: county && county.replace(/[()]/g, ''),
          state: SUPPORTED_STATES[geotarget.State],
        };
      });

    fs.writeFileSync(JSONFilePath, JSON.stringify(data));
  });
