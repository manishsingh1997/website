import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import axios from 'axios';

export const getMapData = (gid) => {
  return axios({
    method: 'get',
    url: ensureUpcomingFeaturesParamInUrl(`${process.env.API_HOST}/api/geo/map/${gid}/`),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
