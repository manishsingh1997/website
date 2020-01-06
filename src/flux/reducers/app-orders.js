import {actionTypes} from '../actions/app-orders';

const initialState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const ordersReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_START:
      return {...state, isListLoading: true};
    case actionTypes.GET_ORDERS_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case actionTypes.GET_ORDERS_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default ordersReducer;
