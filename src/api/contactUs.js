import config from 'website/config';
import axios from 'axios';

export const submitContactUs = (data) => {
  return axios({
    url: config.leadArrivedApi,
    method: 'post',
    data: JSON.stringify(data),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });
};
