
export const getOrderDetailURL = (customerGID, orderId) => {
  return `/app/${customerGID}/orders/${orderId}`;
};

export const getQuoteDetailURL = (customerGID, orderId, quoteId) => {
  return `/app/${customerGID}/orders/${orderId}/quotes/${quoteId}`;
};
