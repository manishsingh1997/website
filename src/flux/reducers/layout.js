import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {actionTypes} from '../actions/layout';

const initialState = {
  phoneNumber: PHONE_NUMBER,
};

const layoutReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PDF_HEADER_PHONE:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
