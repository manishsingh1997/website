import {getCustomerQuotes} from '../../api/app';
import {parseAPIError} from '../../utils/api';

import {GetQuotesDispatcher} from './types';

export enum QuoteActionTypes {
  GET_QUOTES_START = 'GET_QUOTES_START',
  GET_QUOTES_DONE = 'GET_QUOTES_DONE',
  GET_QUOTES_ERROR = 'GET_QUOTES_ERROR',
}

export const getQuotes = (quoteSecret: string) => {
  const dispatcher: GetQuotesDispatcher = (dispatch) => {
    dispatch({
      type: QuoteActionTypes.GET_QUOTES_START,
    });
    const response = getCustomerQuotes(quoteSecret);
    response
      .then((axiosResponse) => {
        dispatch({
          type: QuoteActionTypes.GET_QUOTES_DONE,
          data: axiosResponse.data,
        });
      })
      .catch((errorResponse) => {
        const error = parseAPIError(errorResponse);
        console.error(error.data);
        dispatch({
          type: QuoteActionTypes.GET_QUOTES_ERROR,
          error: parseAPIError(errorResponse),
        });
      });
  };
  return dispatcher;
};
