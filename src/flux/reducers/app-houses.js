import {actionTypes} from '../actions/app-houses';

const initialState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const housesReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOUSES_START:
      return {...state, isListLoading: true};
    case actionTypes.GET_HOUSES_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case actionTypes.GET_HOUSES_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default housesReducer;
