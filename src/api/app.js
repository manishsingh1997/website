import axios from 'axios';
import {authService} from 'utils/auth';
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

export const getCustomerOrderDetails = (customerGID, orderId) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/orders/${orderId}/`,
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

export const approveAndPayQuote = (customerGID, quoteSecret, stripeToken) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/quotes/${quoteSecret}/approve-and-pay/`,
    method: 'post',
    responseType: 'json',
    headers: getCommonHeaders(),
    data: JSON.stringify({
      'stripe_token': stripeToken,
    }),
  });
};

export const getNotificationPreferences = (customerGID, secret) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/notification-preferences?unsubscribe-secret=${secret}`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};

export const updateNotificationPreferences = (customerGID, secret, data) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/notification-preferences?unsubscribe-secret=${secret}`,
    method: 'post',
    responseType: 'json',
    headers: getCommonHeaders(),
    data: JSON.stringify(data),
  });
};

export const updateCustomerContacts = (customerGID, data) => {
  return axios({
    url: `${getBaseAPIURL(customerGID)}/contacts`,
    method: 'post',
    responseType: 'json',
    headers: getCommonHeaders(),
    data: JSON.stringify(data),
  });
};
