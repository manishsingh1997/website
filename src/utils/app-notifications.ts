import queryString from 'query-string';

export const UNSUBSCRIBE_CODE_QUERY_NAME = 'unsubscribe-code';

export const getUnsubscribeCodeFromQuery = (searchQuery: string) => {
  return searchQuery && queryString.parse(searchQuery)[UNSUBSCRIBE_CODE_QUERY_NAME];
};
