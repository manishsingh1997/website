import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import {authService} from 'utils/auth.ts';

const request = (customerGID) => (path, data) => {
  let baseURL = `${process.env.API_HOST}/c/api/v1/customer`;
  if (customerGID) {
    baseURL += `/${customerGID}`;
  }
  return axios({
    method: data ? 'post' : 'get',
    headers: {
      'Content-Type': 'application/json',
      ...authService.getAuthRequestHeaders(),
    },
    url: ensureUpcomingFeaturesParamInUrl(`${baseURL}${path}`),
    responseType: 'json',
    data: !isEmpty(data) ? JSON.stringify(data) : undefined,
  });
};

export const getCustomerContacts = (customerGID) => {
  return request(customerGID)('/contacts');
};

export const getCustomerOrders = (customerGID) => {
  return request(customerGID)('/orders');
};

export const getCustomerOrderDetails = (customerGID, orderId) => {
  return request(customerGID)(`/orders/${orderId}/`);
};

export const getCustomerAppointments = (customerGID) => {
  return request(customerGID)('/appointments');
};

export const getCustomerHouses = (customerGID) => {
  return request(customerGID)('/houses');
};

export const getQuoteDetails = (customerGID, quoteSecret) => {
  return request(customerGID)(`/quotes/${quoteSecret}/`);
};

export const reviewQuote = (customerGID, quoteSecret) => {
  return request(customerGID)(`/quotes/${quoteSecret}/reviewed/`, {});
};

export const approveAndPayQuote = (customerGID, quoteSecret, stripeToken) => {
  return request(customerGID)(`/quotes/${quoteSecret}/approve-and-pay/`, {
    stripe_token: stripeToken,
  });
};

export const getNotificationPreferences = (customerGID, secret) => {
  return request(customerGID)(`/notification-preferences?unsubscribe-secret=${secret}`);
};

export const updateNotificationPreferences = (customerGID, secret, data) => {
  return request(customerGID)(`/notification-preferences?unsubscribe-secret=${secret}`, data);
};

export const updateCustomerContacts = (customerGID, data) => {
  return request(customerGID)('/contacts', data);
};

export const getQuoteApprovalDetails = (customerGID, quoteApprovalSecret) => {
  return request(customerGID)(`/quote-approvals/${quoteApprovalSecret}/`);
};

export const reviewQuoteApproval = (customerGID, quoteApprovalSecret) => {
  return request(customerGID)(`/quote-approvals/${quoteApprovalSecret}/review/`, {});
};

export const approveQuoteApproval = (customerGID, quoteApprovalSecret, stripeToken) => {
  return request(customerGID)(`/quote-approvals/${quoteApprovalSecret}/approve/`, {
    stripe_token: stripeToken,
  });
};

export const getConfig = (configID) => {
  return request()(`/config/${configID}/`);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCustomerSignOffData = (configID) => {
  return {
    data: {
      signoff_at: null,
      signoff_by: null,
      signoff_pdf: null,
      signoff_img: null,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateCustomerSignOffRequirement = (customerGID, data) => {
  return {
    data: {
      signoff_at: new Date().toDateString(),
      signoff_by: '1',
      signoff_pdf: '',
      signoff_img: data.value,
    },
  };
};
