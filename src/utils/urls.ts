import queryString from 'query-string';
import {some} from 'lodash';
import {calcUtils} from '@ergeon/3d-lib';
import {getUnsubscribeCodeFromQuery} from './app-notifications';
import {getFencequotingURLProps} from './types';

export const getOrderDetailURL = (customerGID: string, orderId: number) => {
  return `/app/${customerGID}/orders/${orderId}`;
};

export const getQuoteDetailURL = (customerGID: string, secret: string) => {
  return `/app/${customerGID}/quotes/${secret}`;
};

/**
 * Renders length by unit wrapped in <span>
 * @param {string} schemaCode - Common schemaCode string such as 'schema=3,4,5,...&code=F6,PF,SL8,...'
 * @param {number} zipCode
 * @param {number} fenceSideLength
 */
export const getFencequotingURL = ({
  schemaCode,
  zipCode,
  fenceSideLength,
  options = true,
  fenceSideSlopePercent,
}: getFencequotingURLProps
) => {
  if (!schemaCode) return
  const {getValueFromUrl, getCatalogType} = calcUtils;
  const isItGate = getCatalogType(getValueFromUrl(schemaCode)) === 'fence-gate';
  const baseUrlPath = isItGate ? 'gate3d' : 'fence3d';
  const queryObject = {
    ...queryString.parse(schemaCode),
    mode: '3d',
    options: options ? 'true' : undefined,
    zipcode: zipCode,
    length: isItGate ? '' : fenceSideLength,
    grade: isItGate ? '' : fenceSideSlopePercent,
  };
  return `${process.env.FENCEQUOTING_HOST}/${baseUrlPath}?${queryString.stringify(queryObject)}`;
};

export const isQuoteDetailURL = (url: string) => {
  return some([
    url.match(/^\/app\/[^\/]+\/quotes\/(direct\/|installer\/)?[^\/]+\/?$/g) !== null,
    url.match(/^\/app\/[^\/]+\/quote-approvals\/[^\/]+\/?(direct|installer)?\/?/g) !== null,
  ]);
};

export const isUnsubscribeURL = (urlPathname: string, urlSearch: string): boolean => {
  const unsubscribeCode = getUnsubscribeCodeFromQuery(urlSearch);
  return Boolean(urlPathname.match(/^\/app\/[^\/]+\/settings\/?/g) !== null && unsubscribeCode);
};
