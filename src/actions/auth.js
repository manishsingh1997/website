import authService from 'utils/auth';

export const actionTypes = {
  'AUTH_CODE_ACTIVATION_START': 'AUTH_CODE_ACTIVATION_START',
  'AUTH_CODE_ACTIVATION_DONE': 'AUTH_CODE_ACTIVATION_DONE',
  'AUTH_CODE_ACTIVATION_ERROR': 'AUTH_CODE_ACTIVATION_ERROR',
};

const authenticateUserWithCode = (code) => {
  return async function(dispatch) {
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
        error: {
          response: otpError.response,
          statusCode: otpError.response && otpError.response.status,
          data: otpError.response && otpError.response.data,
        },
      });
    }
  };
};

export const actionTriggers = {
  authenticateUserWithCode,
};
