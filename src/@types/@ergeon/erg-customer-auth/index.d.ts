declare module '@ergeon/erg-customer-auth' {
  export type AuthServiceOptions = {
    cookieName?: string,
    cookieExpire?: number,
    cookieSecure?: boolean,
    domain?: string,
    authApiServer?: string,
    authApiPrefix?: string,
    authApiOTPRequestPath?: string,
    authApiOTPUsePath?: string,
    authApiOTPResendCodePath?: string,
    authApiLogoutPath?: string,
    authApiUserDetailsPath?: string,
  };

  export default class ErgCustomerAuthService {
    constructor(options: AuthServiceOptions) {} // eslint-disable-line
  }
}
