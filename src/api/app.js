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

export const getCustomerAppointments = (customerGID) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/appointments`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};

export const getCustomerHouses = (customerGID) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/houses`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};

export const getQuoteDetails = (customerGID, quoteSecret) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/quotes/${quoteSecret}/`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};

export const reviewQuote = (customerGID, quoteSecret) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/quotes/${quoteSecret}/reviewed/`,
    method: 'post',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};
