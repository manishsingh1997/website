import config from 'website/config';
import axios from 'axios';
import humps from 'lodash-humps';  // don't use 'camelcase-keys', it brokes the app in old browsers, ENG-3194

export const getHelpNode = (nodeId = config.HELP_ROOT_NODE) => {
  const query = `/c/api/v1/help/node/${nodeId}/`;
  return axios({
    method: 'get',
    url: config.apiHost + query,
    data: JSON.stringify(nodeId),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
    transformResponse: [(data) => {
      return humps(data);
    }],
  }).then(result => result.data);
};

export const getHelpResults = (search) => {
  const query = `/c/api/v1/help/node/?search=${search}`;
  return axios({
    method: 'get',
    url: config.apiHost + query,
    data: JSON.stringify(search),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
    transformResponse: [(data) => {
      return humps(data);
    }],
  });
};
