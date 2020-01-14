import axios from 'axios';
import authService from 'utils/auth';
import config from 'website/config';
import {formatDate} from '../utils/date';

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

export const getCustomerAppointments = (customerGID, startFromDate) => {
  startFromDate = formatDate(startFromDate, 'YYYY-MM-DD');
  return axios({
    url: `${getBaseAPIURL(customerGID)}/appointments?date__gte=${startFromDate}`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};
