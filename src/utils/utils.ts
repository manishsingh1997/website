import {isChristmasTime as baseIsChristmasTime} from '@ergeon/core-components';
import {AxiosError} from 'axios';
import {CatalogType} from '@ergeon/3d-lib/';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';

import {trackError} from './analytics';
import {isPastDate} from './date';

type ResponseError = AxiosError & {responseText: string; statusText: string};
type RetryParameters = (noOfRequest: number, callback: (error?: unknown) => unknown) => Promise<never | unknown>;
type OrderType = {schema: string[], code: string[], catalog_type: string};

export const parseError = (error: unknown) => {
  try {
    const json = JSON.parse((error as ResponseError).responseText);

    for (const key in json) {
      const value = json[key];
      return `${Array.isArray(value) ? value[0] : value}: '${key}'`;
    }
  } catch (e) {
    return (error as ResponseError).statusText;
  }
};

export const getParameterByName = (name: string, url: string) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  let parameterValue;
  try {
    parameterValue = decodeURIComponent(results[2].replace(/\+/g, ' '));
  } catch (error) {
    parameterValue = '';
    console.error(error);
    trackError(error);
  }
  return parameterValue;
};

export const getExpiresAtTitle = (expiresAt: Date | string | null) => {
  return isPastDate(expiresAt) ? 'Expired At' : 'Expires At';
};

export const isChristmasTime = () => {
  return baseIsChristmasTime(new Date());
};

export const showUpcomingFeatures = (issueNumber: string) => {
  if (process.env.SHOW_UPCOMING_FEATURES === 'true') {
    return true;
  }
  return isUpcomingFeaturesEnabled(issueNumber);
};

export const getAdvancedEditorUrl = (order: OrderType, zipcode: string) => {
  const sep = ',';
  let query = '';
  if (order['catalog_type'] == CatalogType.FENCE) {
    query = '/fence3d?schema=';
  } else {
    query = '/gate3d?schema=';
  }
  order.schema.forEach((key) => {
    query += key + sep;
  });
  query = query.slice(0, -1);
  query += '&code=';
  order.code.forEach((key) => {
    query += key + sep;
  });
  query = query.slice(0, -1);
  query += '&options=true&mode=3d';
  if (zipcode) {
    query += `&zipcode=${zipcode}`;
  }
  return query;
};

export const isPDFMode = () => {
  const asPDF = getParameterByName('asPDF', '') || '';

  return asPDF.toLocaleLowerCase() === 'true';
};

export const scrollTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

/**
 * Rejects if specified promise doesn’t resolve in provided `timeout` ms.
 * @param {Promise} promise
 * @param {string} funcName
 * @param {number} timeout ms
 */
export const rejectOnTimeout = function (promise: Promise<unknown>, funcName: string, timeout = 500) {
  const timeoutPromise = new Promise((_, reject) => {
    const timeoutID = setTimeout(() => {
      clearTimeout(timeoutID);
      reject(`Function ${funcName} took more than ${timeout} ms to execute, rejecting`);
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]);
};

/**
 * Resolve if specified promise doesn’t resolve in provided `timeout` ms.
 * @param {Function} fn
 * @param {string} funcName
 * @param {number} timeout ms
 */
export const resolveOnTimeout = function (promise: Promise<unknown>, funcName: string, timeout = 500) {
  return new Promise((resolve) => {
    try {
      rejectOnTimeout(promise, funcName, timeout);
      resolve('');
    } catch (error) {
      resolve('');
    }
  });
};

export const retryRequest : RetryParameters = async (noOfRequest = 0, callback) => {
  try {
    return await callback();
  } catch (error) {
    if (noOfRequest === 0) return callback(error);
    return retryRequest(noOfRequest - 1, callback);
  }
};
