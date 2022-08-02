import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import {authService} from '../utils/auth';

type Method = 'get' | 'post' | 'patch';

export const getReqMethod = (method?: Method, data?: unknown): Method => {
  if (method) {
    return method;
  } else if (data) {
    return 'post';
  }
  return 'get';
};

export const request = (customerGID?: string | number) => (path: string, data?: unknown, method?: Method) => {
  let baseURL = `${process.env.API_HOST}/c/api/v1/customer`;
  const reqMethod = getReqMethod(method, data);
  if (customerGID) {
    baseURL += `/${customerGID}`;
  }
  return axios({
    method: reqMethod,
    headers: {
      'Content-Type': 'application/json',
      // @ts-ignore
      ...authService.getAuthRequestHeaders(),
    },
    url: ensureUpcomingFeaturesParamInUrl(`${baseURL}${path}`),
    responseType: 'json',
    data: !isEmpty(data) ? JSON.stringify(data) : undefined,
  });
};
