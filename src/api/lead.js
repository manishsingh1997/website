import config from 'website/config';
import axios from 'axios';
import {calcUtils, constants} from '@ergeon/3d-lib';
import {Places} from '@ergeon/core-components';
const {GoogleMapsLoader, parsePlace} = Places;

export const submitLeadArrived = (data) => {
  return axios({
    url: config.leadArrivedApi,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};

export const submitAddressEntered = (data) => {
  return axios({
    url: config.addressEnteredApi,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};

export const getCheckedZIP = (zipcode) => {
  const query = `/c/api/v1/product/check-zipcode/${zipcode}/`;
  return axios({
    method: 'get',
    url: config.apiHost + query,
    data: JSON.stringify(zipcode),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};

export const getPriceAndDescription = (modelState, zipcode) => {
  const {GATE_TYPE, CATALOG_TYPE_FENCE, CATALOG_TYPE_GATE} = constants;
  const schemaCode = calcUtils.getSchemaCodeFromState(modelState);
  const catalogType = modelState[GATE_TYPE] ? CATALOG_TYPE_GATE : CATALOG_TYPE_FENCE;
  const query = `/c/api/v1/product/catalog-price/?${schemaCode}&zipcode=${zipcode}&catalog_type=${catalogType}`;
  const request = config.apiHost + query;
  return axios
    .get(request)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
};

export const getPlaceData = (address) => {
  return new Promise((resolve, reject) => {
    GoogleMapsLoader.load(google => {
      const geocode = new google.maps.Geocoder();
      geocode.geocode({address}, (results, status) => {
        if (results.length) {
          resolve(parsePlace(results[0]));
        } else if (status !== google.maps.GeocoderStatus.OK) {
          console.error('Google Geocoder error:', status);
          reject(results, status);
        }
      });
    });
  });
};
