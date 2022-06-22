import {City} from '../../components/AppCityPage/types';
import {actionTypes} from '../actions/city';

export type CityReducerState = {
  data: City | null;
  isLoading: boolean;
  error: Error | null;
};

type CityReducerAction = {
  data: City | null;
  error: Error | null;
  type: keyof typeof actionTypes;
};

const initialState: CityReducerState = {
  data: null,
  isLoading: false,
  error: null,
};

const cityReducer = (state = initialState, action: CityReducerAction) => {
  switch (action.type) {
    case actionTypes.GET_CITY_START:
      return {...state, isLoading: true};
    case actionTypes.GET_CITY_DONE:
      return {...state, isLoading: false, error: null, data: action.data};
    case actionTypes.GET_CITY_ERROR:
      return {...state, isLoading: false, error: action.error};
    case actionTypes.RESET_CITY:
      return initialState;
    default:
      return state;
  }
};

export default cityReducer;
