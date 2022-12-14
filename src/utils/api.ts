import {ErrorResponse, ParsedAPIErrorType} from './types';

export const parseAPIError = (error: {response?: ErrorResponse}): ParsedAPIErrorType => {
  return {
    response: error.response,
    statusCode: error.response && error.response.status,
    statusText: error.response && error.response.statusText,
    data: error.response && error.response.data,
    nonFieldErrors: (error.response && error.response.data && error.response.data['non_field_errors']) || [],
  };
};
