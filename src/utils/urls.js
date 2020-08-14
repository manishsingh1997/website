import {getUnsubscribeCodeFromQuery} from 'utils/app-notifications';

export const getOrderDetailURL = (customerGID, orderId) => {
  return `/app/${customerGID}/orders/${orderId}`;
};

export const getQuoteDetailURL = (customerGID, secret) => {
  return `/app/${customerGID}/quotes/${secret}`;
};

export const isQuoteDetailURL = (url) => {
  return url.match(/^\/app\/[^\/]+\/quotes+\/(direct\/|vendor\/)?[^\/]+\/?$/g) !== null;
};

export const isUnsubscribeURL = (urlPathname, urlSearch) => {
  const unsubscribeCode = getUnsubscribeCodeFromQuery(urlSearch);
  return urlPathname.match(/^\/app\/[^\/]+\/notifications\/?/g) !== null && unsubscribeCode;
};
