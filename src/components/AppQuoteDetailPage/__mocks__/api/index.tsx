import Quote from '../data/Quote';

export const GetQuoteSuccess = () => {
  return Promise.resolve({
    data: Quote,
    status: 200,
    statusText: 'OK',
    headers: '',
    config: {},
  });
};

export const GetQuoteFailed = (status = 404) => {
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
