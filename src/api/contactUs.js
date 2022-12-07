import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import axios from 'axios';

export const submitContactUs = (data) => {
  return axios({
    url: ensureUpcomingFeaturesParamInUrl(process.env.LEAD_ARRIVED_API),
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
