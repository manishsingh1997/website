import {HouseType} from '../../components/types';
import {ParsedAPIErrorType} from '../../utils/types';
import {HouseActionTypes} from '../actions/app-houses';

type HouseReducerState = {
  data: HouseType[] | null,
  isListLoading: boolean,
  listError: ParsedAPIErrorType | null,
};

type HouseReducerAction = {
  data: HouseType[];
  error: ParsedAPIErrorType;
  type: keyof typeof HouseActionTypes;
}

const initialState: HouseReducerState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const housesReducer = (state = initialState, action: HouseReducerAction) => {
  switch (action.type) {
    case HouseActionTypes.GET_HOUSES_START:
      return {...state, isListLoading: true};
    case HouseActionTypes.GET_HOUSES_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case HouseActionTypes.GET_HOUSES_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default housesReducer;
