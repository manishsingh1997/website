import config from 'website/config';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

export const getHelpNode = (nodeId = config.HELP_ROOT_NODE) => {
  const query = `/c/api/v1/help/node/${nodeId}/`;
  return axios({
    method: 'get',
    url: config.myErgeonURL + query,
    data: JSON.stringify(nodeId),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
    transformResponse: [(data) => {
      return camelcaseKeys(data, {deep: true});
    }],
  }).then(result => result.data);
};

export const getHelpResults = (search) => {
  const query = `/c/api/v1/help/node/?search=${search}`;
  return axios({
    method: 'get',
    url: config.myErgeonURL + query,
    data: JSON.stringify(search),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
    transformResponse: [(data) => {
      return camelcaseKeys(data, {deep: true});
    }],
  });
};
