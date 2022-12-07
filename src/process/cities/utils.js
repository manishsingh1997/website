const StateAbbrToFullName = require('../../data/state-abbr-full-name-data.json');
const StateAbbrToContract = require('../../data/state-contracts-data.json');

function addWarrantyAndFullNameToCities(cities = []) {
  return cities.map((city) => {
    const stateAbbr = city.state?.toUpperCase();
    const stateFullName = StateAbbrToFullName[stateAbbr];
    const warranty = StateAbbrToContract[stateAbbr];
    const updatedFields = {};

    if (stateFullName) {
      updatedFields['state_full_name'] = stateFullName;
    }
    if (warranty) {
      updatedFields['warranty'] = warranty;
    }
    return {
      ...city,
      ...updatedFields,
    };
  });
}

module.exports = {
  addWarrantyAndFullNameToCities,
};
