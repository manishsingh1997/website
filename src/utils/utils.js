import queryString from 'query-string';

import {isChristmasTime as baseIsChristmasTime} from '@ergeon/core-components';
import {constants} from '@ergeon/3d-lib/';

import config, {DEVELOPMENT} from 'website/config';
import {getUserAgent, getUserUuid, getUTM} from './analytics';
import {DEFAULT_SOURCE_VALUE} from '../website/constants';
import cleanDeep from 'clean-deep';

export const parseError = (error) => {
  try {
    const json = JSON.parse(error.responseText);

    for (const key in json) {
      const value = json[key];
      return `${Array.isArray(value) ? value[0] : value }: '${key}'`;
    }
  } catch (e) {
    return error.statusText;
  }
};

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${ name }(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

export const isChristmasTime = () => {
  return baseIsChristmasTime(new Date);
};

export const showUpcomingFeatures = () => {
  if (config.env === DEVELOPMENT) {
    return true;
  }
  const location = window.location || (window.document && window.document.location);
  if (location && location.search) {
    return 'upcoming-features' in queryString.parse(location.search);
  }
  return false;
};

export const getEventData = (data) => {
  const {savedAt, ...utms} = getUTM();
  let submitData = {
    ...data,
    uuid: getUserUuid(),
    object: {
      ...utms,
      ...getUserAgent(),
      'utm_source': utms['utm_source'] || 'website',
      pathname: window.location.pathname,
      'arrival_time': savedAt,
      'user_ip': window.userip,
      'inner_width': window.innerWidth,
      'inner_height': window.innerHeight,
      href: window.location.href,
      search: window.location.search,
    },
    source: DEFAULT_SOURCE_VALUE,
  };
  submitData = cleanDeep(submitData);
  return submitData;
};

export const getAdvancedEditorUrl = (order, zipcode) => {
  const {CATALOG_TYPE_FENCE} = constants;
  const sep = ',';
  let query = '';
  if (order['catalog_type'] == CATALOG_TYPE_FENCE) {
    query = '/fence3d?schema=';
  } else {
    query = '/gate3d?schema=';
  }
  order.schema.forEach(key => {
    query += key + sep;
  });
  query = query.slice(0, -1);
  query += '&code=';
  order.code.forEach(key => {
    query += key + sep;
  });
  query = query.slice(0, -1);
  query += '&options=true&mode=3d';
  query += `&zipcode=${zipcode}`;
  return query;
};