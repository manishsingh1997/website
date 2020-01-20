export const filterQuotesSentToCustomer = (quotes) => {
  return quotes.filter(quote => quote['sent_to_customer_at']);
};

export const formatPrice = (price) => {
  return Math.floor(price || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,  // don't show digits after decimal point (i.e. cents)
  });
};
