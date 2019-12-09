import config from 'website/config';
import axios from 'axios';

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
    url: config.myErgeonURL + query,
    data: JSON.stringify(zipcode),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
