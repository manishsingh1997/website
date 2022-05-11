import { ParsedAPIErrorType } from '../../utils/types';
import {actionTypes} from '../actions/auth';

type AuthUser = {
  gid: string
};

type AuthError = {
  statusCode: string | number,
  data: {
    otp?: {errorCode: string},
  },
};

export type AuthState = {
  authError: AuthError | null,
  isAuthLoading: boolean,
  isResendLinkLoading: boolean,
  isResendLinkSuccess: boolean,
  isUserLoading: boolean,
  isUserLoggedOut: boolean,
  logoutError: AuthError | null,
  resendLinkError: object | null,
  user: AuthUser | null,
  userError: AuthError | null,
  userSetByCode: boolean,
};

export const initialAuthState: AuthState = {
  user: null,
  isAuthLoading: false,
  authError: null,
  isUserLoading: true,
  userError: null,
  userSetByCode: false,
  isUserLoggedOut: false,
  logoutError: null,
  resendLinkError: null,
  isResendLinkLoading: false,
  isResendLinkSuccess: false,
};

type AuthAction = {
  user: AuthUser,
  error: ParsedAPIErrorType,
  type: keyof typeof actionTypes,
}

const authReducer = (state = initialAuthState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.AUTH_CODE_ACTIVATION_START:
      return {...state, isAuthLoading: true};
    case actionTypes.AUTH_CODE_ACTIVATION_DONE:
      return {...state, isAuthLoading: false, authError: null, user: action.user, userSetByCode: true};
    case actionTypes.AUTH_CODE_ACTIVATION_ERROR:
      return {...state, isAuthLoading: false, authError: action.error};

    case actionTypes.AUTH_GET_USER_START:
      return {...state, isUserLoading: true};
    case actionTypes.AUTH_GET_USER_DONE:
      if (!state.userSetByCode || !state.user) {
        return {...state, isUserLoading: false, userError: null, user: action.user};
      }
      // Don't overwrite the user if it was set by code confirmation (possible race condition)
      return {...state, isUserLoading: false, userError: null};
    case actionTypes.AUTH_GET_USER_ERROR:
      return {...state, isUserLoading: false, userError: action.error};

    case actionTypes.AUTH_LOGOUT_START:
      return {...state, isAuthLoading: true, isUserLoggedOut: false};
    case actionTypes.AUTH_LOGOUT_DONE:
      return {...state, isAuthLoading: false, logoutError: null, user: null, isUserLoggedOut: true};
    case actionTypes.AUTH_LOGOUT_ERROR:
      return {...state, isAuthLoading: false, logoutError: action.error};

    case actionTypes.RESEND_NEW_LINK_START:
      return {...state, isResendLinkLoading: true, isResendLinkSuccess: false};
    case actionTypes.RESEND_NEW_LINK_DONE:
      return {...state, isResendLinkLoading: false, resendLinkError: null, isResendLinkSuccess: true};
    case actionTypes.RESEND_NEW_LINK_ERROR:
      return {...state, resendLinkError: action.error, isResendLinkLoading: false, isResendLinkSuccess: false};
    default:
      return state;
  }
};

export default authReducer;
