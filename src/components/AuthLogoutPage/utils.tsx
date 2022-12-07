import { AUTH_STATE} from './constants'
import { AuthType } from './types';

export const getAuthState = (auth: AuthType) => {
  if (auth.isUserLoggedOut) {
    return AUTH_STATE.USER_LOGGED_OUT;
  }
  if (!auth.user) {
    return AUTH_STATE.USER_NOT_LOGGED_IN;
  }
}
