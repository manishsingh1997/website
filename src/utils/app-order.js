import {isPastDate} from 'utils/date';

import {QUOTE_STATUS_CODE_APPROVED, QUOTE_STATUS_CODE_SENT, QUOTE_STATUS_CODE_CANCELLED} from 'website/constants';

export const QUOTE_FILTERS = [
  {value: 'active', label: 'Active Quotes', statuses: [QUOTE_STATUS_CODE_SENT, QUOTE_STATUS_CODE_APPROVED]},
  {value: 'sent', label: 'Sent Quotes', statuses: [QUOTE_STATUS_CODE_SENT]},
  {value: 'approved', label: 'Approved Quotes', statuses: [QUOTE_STATUS_CODE_APPROVED]},
  {value: 'expired', label: 'Expired Quotes', statuses: [QUOTE_STATUS_CODE_SENT, QUOTE_STATUS_CODE_CANCELLED]},
  {value: 'cancelled', label: 'Cancelled Quotes', statuses: [QUOTE_STATUS_CODE_CANCELLED]},
];

export const DEFAULT_QUOTE_FILTER = QUOTE_FILTERS[0];

const QUOTE_ORDERING = [QUOTE_STATUS_CODE_APPROVED, QUOTE_STATUS_CODE_SENT, QUOTE_STATUS_CODE_CANCELLED];

export const filterQuotesByStatus = (quotes, selectedOption) => {
  quotes = quotes.filter((quote) => {
    return selectedOption['statuses'].includes(quote['status']['code']) && quote['sent_to_customer_at'];
  });

  quotes.sort((a, b) => new Date(b['sent_to_customer_at']).getTime() - new Date(a['sent_to_customer_at']).getTime());
  quotes.sort((a, b) => QUOTE_ORDERING.indexOf(a['status']['code']) - QUOTE_ORDERING.indexOf(b['status']['code']));

  if (['active', 'sent'].includes(selectedOption['value'])) {
    quotes = quotes.filter((quote) => {
      const expiresAt = quote['expires_at'];
      if (!expiresAt && quote['status']['code'] === QUOTE_STATUS_CODE_APPROVED) {
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
  return quotes.filter((quote) => quote['sent_to_customer_at']);
};

export const formatPrice = (price) => {
  return parseFloat(price || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const isQuoteReplaced = (quote) => {
  return quote && quote['replaced_by_quote'] && quote['replaced_by_quote']['secret'];
};

export const isQuoteCancelled = (quote) => {
  return quote && quote['status']['code'] === QUOTE_STATUS_CODE_CANCELLED;
};

export const isQuoteApproved = (quote) => {
  return quote && quote['status']['code'] === QUOTE_STATUS_CODE_APPROVED;
};

export const isQuoteExpired = (quote) => {
  return quote && isPastDate(quote['expires_at']);
};

export const isQuoteAddressValid = (quote) => {
  const hasValidAddress = Boolean(quote?.order.house.address || quote?.order.house.customer.main_address);

  if (!hasValidAddress) {
    console.warn(
      `Quote Inconsistency Error - quote #${quote?.id} has empty address for house #${quote?.order.house.id}.`
    );
  }

  return hasValidAddress;
};
