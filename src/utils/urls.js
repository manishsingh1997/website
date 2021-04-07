import {getUnsubscribeCodeFromQuery} from 'utils/app-notifications';
import config from 'website/config';
import queryString from 'query-string';
import {calcUtils} from '@ergeon/3d-lib';

export const getOrderDetailURL = (customerGID, orderId) => {
  return `/app/${customerGID}/orders/${orderId}`;
};

export const getQuoteDetailURL = (customerGID, secret) => {
  return `/app/${customerGID}/quotes/${secret}`;
};

/**
 * Renders length by unit wrapped in <span>
 * @param {string} schemaCode - Common schemaCode string such as 'schema=3,4,5,...&code=F6,PF,SL8,...'
 * @param {number} zipCode
 * @param {number} fenceSideLength
 */
export const getFencequotingURL = (schemaCode, zipCode, fenceSideLength) => {
  const {getValueFromUrl, getCatalogType} = calcUtils;
  const isItGate = getCatalogType(getValueFromUrl(schemaCode)) === 'fence-gate';
  const baseUrlPath = isItGate ? 'gate3d' : 'fence3d';
  const queryObject = {
    ...queryString.parse(schemaCode),
    mode: '3d',
    options: 'true',
    zipcode: zipCode,
    length: isItGate ? '' : fenceSideLength,
  };
  return `${config.fencequotingHost}/${baseUrlPath}?${queryString.stringify(queryObject)}`;
};

export const isQuoteDetailURL = (url) => {
  return url.match(/^\/app\/[^\/]+\/quotes+\/(direct\/|vendor\/)?[^\/]+\/?$/g) !== null;
};

export const isUnsubscribeURL = (urlPathname, urlSearch) => {
  const unsubscribeCode = getUnsubscribeCodeFromQuery(urlSearch);
  return urlPathname.match(/^\/app\/[^\/]+\/notifications\/?/g) !== null && unsubscribeCode;
};
