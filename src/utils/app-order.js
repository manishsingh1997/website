import {isPastDate} from 'utils/date';

export const QUOTE_FILTERS = [
  {value: 'active', label: 'Active Quotes', statuses: ['SNT', 'APP']},
  {value: 'sent', label: 'Sent Quotes', statuses: ['SNT']},
  {value: 'approved', label: 'Approved Quotes', statuses: ['APP']},
  {value: 'expired', label: 'Expired Quotes', statuses: ['SNT', 'CAN']},
  {value: 'cancelled', label: 'Cancelled Quotes', statuses: ['CAN']},
];

export const DEFAULT_QUOTE_FILTER = QUOTE_FILTERS[0];

const QUOTE_ORDERING = ['APP', 'SNT', 'CAN'];

export const filterQuotesByStatus = (quotes, selectedOption) => {
  quotes = quotes.filter((quote) => {
    return selectedOption['statuses'].includes(quote['status']) && quote['sent_to_customer_at'];
  });

  quotes.sort((a, b) => (new Date(b['sent_to_customer_at']).getTime() - new Date(a['sent_to_customer_at']).getTime()));
  quotes.sort((a, b) => (QUOTE_ORDERING.indexOf(a['status']) - QUOTE_ORDERING.indexOf(b['status'])));

  if (['active', 'sent'].includes(selectedOption['value'])) {
    quotes = quotes.filter((quote) => {
      const expiresAt = quote['expires_at'];
      if (!expiresAt && quote['status'] === 'APP') {
        return true;
      }
      return expiresAt && !isPastDate(expiresAt);
    });
  } else if (selectedOption['value'] === 'expired') {
    quotes = quotes.filter((quote) => {
      return quote['expires_at'] && isPastDate(quote['expires_at']);
    });
  }
  return quotes;
};

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
