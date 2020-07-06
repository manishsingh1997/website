import axios from 'axios';
import config from 'website/config';
import {authService} from 'utils/auth';

const getBaseAPIURL = () => {
  return `${config.apiHost}/api/help/node/`;
};

const getCommonHeaders = () => {
  const authHeaders = authService.getAuthRequestHeaders();
  return {'Content-Type': 'application/json', ...authHeaders};
};

export const getNodes = (ids) => {
  const idsString = ids.join(',');
  return axios({
    url: `${getBaseAPIURL()}?node_id=${idsString}`,
    method: 'get',
    responseType: 'json',
    headers: getCommonHeaders(),
  });
};
