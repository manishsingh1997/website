import axios from 'axios';
import authService from 'utils/auth';
import config from 'website/config';

const getBaseAPIURL = (customerGID) => {
  return `${config.apiHost}/c/api/v1/customer/${customerGID}`;
};

const getCommonHeaders = () => {
  const authHeaders = authService.getAuthRequestHeaders();
  return {'Content-Type': 'application/json', ...authHeaders};
};

export const getCustomerContacts = (customerGID) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/contacts`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};

export const getCustomerOrders = (customerGID) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/orders`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};
