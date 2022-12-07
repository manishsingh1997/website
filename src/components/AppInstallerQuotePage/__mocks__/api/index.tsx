import ApprovedQuote from '../../../AppCustomerQuotePage/__mocks__/data/ApprovedQuote';
import CancelledQuote from '../../../AppCustomerQuotePage/__mocks__/data/CancelledQuote';

export const GetApprovedQuoteSuccess = () => {
  return Promise.resolve({
    data: ApprovedQuote.quote,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

export const GetCancelledQuoteSuccess = () => {
  return Promise.resolve({
    data: CancelledQuote.quote,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

export const GetQuoteFailed = (status: number) => {
  return Promise.reject({
    response: {
      data: null,
      statusText: 'Not Found',
      headers: '',
      config: {},
      status,
    },
  });
};
