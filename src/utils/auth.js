import queryString from 'query-string';
import ErgCustomerAuthService from '@ergeon/erg-customer-auth';

const getAuthService = () => {
  const website2ndLevelDomain = process.env.WEBSITE_DOMAIN.match(/\.?(\w+\.\w+)$/i)[1];
  const authOptions = {
    domain: website2ndLevelDomain,
    cookieName: process.env.NODE_ENV === 'production' ? 'ergeon_token' : `ergeon_token_${process.env.NODE_ENV}`,
    cookieSecure: process.env.NODE_ENV !== 'development',
    authApiServer: `${process.env.API_HOST}/`,
  };

  return new ErgCustomerAuthService(authOptions);
};

export const authService = authService || getAuthService();

export const getAuthOTPCode = (querystring) => {
  const parsedQuery = queryString.parse(querystring);
  return parsedQuery.code;
};
