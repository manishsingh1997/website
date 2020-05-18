import axios from 'axios';
import config from 'website/config';

export const getMapData = (gid) => {
  return axios({
    method: 'get',
    url: `${config.apiHost}/api/geo/map/${gid}/`,
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
