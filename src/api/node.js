import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import axios from 'axios';

import {authService} from 'utils/auth';

const getBaseAPIURL = () => {
  return `${process.env.API_HOST}/api/help/node/`;
};

const getCommonHeaders = () => {
  const authHeaders = authService.getAuthRequestHeaders();
  return {'Content-Type': 'application/json', ...authHeaders};
};

export const getNodes = (ids) => {
  const idsString = ids.join(',');
  return axios({
    url: ensureUpcomingFeaturesParamInUrl(`${getBaseAPIURL()}?node_key=${idsString}`),
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};
