import {authService} from 'utils/auth';
import {parseAPIError} from 'utils/api';

export const actionTypes = {
  AUTH_CODE_ACTIVATION_START: 'AUTH_CODE_ACTIVATION_START',
  AUTH_CODE_ACTIVATION_DONE: 'AUTH_CODE_ACTIVATION_DONE',
  AUTH_CODE_ACTIVATION_ERROR: 'AUTH_CODE_ACTIVATION_ERROR',
  AUTH_GET_USER_START: 'AUTH_GET_USER_START',
  AUTH_GET_USER_DONE: 'AUTH_GET_USER_DONE',
  AUTH_GET_USER_ERROR: 'AUTH_GET_USER_ERROR',
  AUTH_LOGOUT_START: 'AUTH_LOGOUT_START',
  AUTH_LOGOUT_DONE: 'AUTH_LOGOUT_DONE',
  AUTH_LOGOUT_ERROR: 'AUTH_LOGOUT_ERROR',
  RESEND_NEW_LINK_START: 'RESEND_NEW_LINK_START',
  RESEND_NEW_LINK_DONE: 'RESEND_NEW_LINK_DONE',
  RESEND_NEW_LINK_ERROR: 'RESEND_NEW_LINK_ERROR',
};

export const resendLink = (otp) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.RESEND_NEW_LINK_START,
    });
    try {
      await authService.resendOTP(otp);
      dispatch({
        type: actionTypes.RESEND_NEW_LINK_DONE,
      });
    } catch (otpError) {
      dispatch({
        type: actionTypes.RESEND_NEW_LINK_ERROR,
        error: parseAPIError(otpError),
      });
    }
  };
};

export const authenticateUserWithCode = (code) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.AUTH_CODE_ACTIVATION_START,
    });

    try {
      await authService.authenticateWithOTP(code);
      // TODO: update authenticateWithOTP to return user data, so additional request will not be needed
      const user = await authService.getUser();
      dispatch({
        type: actionTypes.AUTH_CODE_ACTIVATION_DONE,
        user,
      });
    } catch (otpError) {
      dispatch({
        type: actionTypes.AUTH_CODE_ACTIVATION_ERROR,
        error: parseAPIError(otpError),
      });
    }
  };
};

export const getCurrentUser = () => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.AUTH_GET_USER_START,
    });

    try {
      const user = await authService.getUser();
      dispatch({
        type: actionTypes.AUTH_GET_USER_DONE,
        user,
      });
    } catch (userError) {
      dispatch({
        type: actionTypes.AUTH_GET_USER_ERROR,
        error: parseAPIError(userError),
      });
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.AUTH_LOGOUT_START,
    });

    try {
      await authService.logout();
      dispatch({
        type: actionTypes.AUTH_LOGOUT_DONE,
      });
    } catch (otpError) {
      dispatch({
        type: actionTypes.AUTH_LOGOUT_ERROR,
        error: parseAPIError(otpError),
      });
    }
  };
};
