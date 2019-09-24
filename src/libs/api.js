import config from 'libs/config';
import axios from 'axios';

export const submitNoAddressLeadData = (data) => {
  return axios({
    url: `${config.myErgeonURL}/c/api/v1/leads/call/`,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
export const submitLeadData = (data, lead) => {
  return axios({
    url: `${config.myErgeonURL}/c/api/v1/quotes/`,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json', 'Authorization': `LeadToken ${lead.token}`},
  });
};
export const submitWaitListLeadData = (data, lead) => {
  return axios({
    url: `${config.myErgeonURL}/c/api/v1/lead/${lead.gid}/`,
    method: 'patch',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
export const submitAddressData = (data) => {
  return axios({
    url: `${config.myErgeonURL}/c/api/v1/lead/`,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
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
