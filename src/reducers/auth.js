import {actionTypes} from 'actions/auth';

const initialAuthState = {
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state=initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_CODE_ACTIVATION_START:
      return {...state, isLoading: true};
    case actionTypes.AUTH_CODE_ACTIVATION_DONE:
      return {...initialAuthState, isLoading: false, user: action.user};
    case actionTypes.AUTH_CODE_ACTIVATION_ERROR:
      return {...initialAuthState, isLoading: false, error: action.error};
    default:
      return state;
  }
};

export default authReducer;
