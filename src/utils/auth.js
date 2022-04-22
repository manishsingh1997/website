import queryString from 'query-string';
import ErgCustomerAuthService from '@ergeon/erg-customer-auth';

const website2ndLevelDomain = process.env.WEBSITE_DOMAIN.match(/\.?(\w+\.\w+)$/i)[1];

export const authService =
  authService ||
  new ErgCustomerAuthService({
    domain: website2ndLevelDomain,
    cookieName: process.env.NODE_ENV === 'production' ? 'ergeon_token' : `ergeon_token_${process.env.NODE_ENV}`,
    cookieSecure: process.env.NODE_ENV !== 'development',
    authApiServer: `${process.env.API_HOST}/`,
  });

export const getAuthOTPCode = (querystring) => {
  const parsedQuery = queryString.parse(querystring);
  return parsedQuery.code;
};
