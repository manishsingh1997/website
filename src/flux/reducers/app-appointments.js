import {actionTypes} from '../actions/app-appointments';

const initialState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const appointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_APPOINTMENTS_START:
      return {...state, isListLoading: true};
    case actionTypes.GET_APPOINTMENTS_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case actionTypes.GET_APPOINTMENTS_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default appointmentsReducer;
