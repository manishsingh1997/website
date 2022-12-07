import {request} from './utils';

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

export const addCustomerHouse = (customerGID, data) => {
  return request(customerGID)('/houses', data);
};

export const editCustomerHouse = (customerGID, houseId, data) => {
  return request(customerGID)(`/houses/${houseId}`, data, 'patch');
};

export const removeCustomerHouse = (customerGID, houseId) => {
  return request(customerGID)(`/houses/${houseId}/hide`, null, 'post');
};

export const getQuoteDetails = (customerGID, quoteSecret) => {
  return request(customerGID)(`/quotes/${quoteSecret}/`);
};

export const getCustomerQuotes = (quoteSecret) => {
  return request()(`/${quoteSecret}/quote-approvals`);
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

export const updateCustomerSignOffRequirement = (customerGID, quoteApprovalSecret, data) => {
  return request(customerGID)(`/quote-approvals/${quoteApprovalSecret}/signoff/`, data);
};
