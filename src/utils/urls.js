
export const getOrderDetailURL = (customerGID, orderId) => {
  return `/app/${customerGID}/orders/${orderId}`;
};

export const getQuoteDetailURL = (customerGID, secret) => {
  return `/app/${customerGID}/quotes/${secret}`;
};

export const isQuoteDetailURL = (url) => {
  return url.match(/^\/app\/[^\/]+\/quotes\/[^\/]+\/?$/g) !== null;
};
