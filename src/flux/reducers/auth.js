import {actionTypes} from '../actions/auth';

const initialAuthState = {
  user: null,
  isAuthLoading: false,
  authError: null,
  isUserLoading: true,
  userError: null,
  userSetByCode: false,
  isUserLoggedOut: false,
  logoutError: null,
};

const authReducer = (state=initialAuthState, action) => {
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

    default:
      return state;
  }
};

export default authReducer;
