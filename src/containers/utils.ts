import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import omit from 'lodash/omit';

export const useLocationSearchOmit = (omitParams: string[]) => {
  const { search } = useLocation();

  const params = useMemo(() => queryString.parse(search), [search]);

  const query = useMemo(() => {
    const restParams = omit(params, omitParams);
    return queryString.stringify(restParams);
  }, [omitParams, params]);

  if (!query) return '';

  return `?${query}`;
};
