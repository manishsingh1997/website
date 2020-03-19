import queryString from 'query-string';
import ErgCustomerAuthService from '@ergeon/erg-customer-auth';

import {DEVELOPMENT, PRODUCTION} from 'website/config';
import config from 'website/config';

export const authService = authService || new ErgCustomerAuthService({
  domain: config.websiteDomain,
  cookieName: config.level === PRODUCTION ? 'ergeon_token' : `ergeon_token_${config.level}`,
  cookieSecure: config.level !== DEVELOPMENT,
  authApiServer: `${config.apiHost}/`,
});

export const getAuthOTPCode = (querystring) => {
  const parsedQuery = queryString.parse(querystring);
  return parsedQuery.code;
};
