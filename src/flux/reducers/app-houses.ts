import {HouseType} from '../../components/types';
import {ParsedAPIErrorType} from '../../utils/types';
import {HouseActionTypes} from '../actions/app-houses';

type HouseReducerState = {
  data: HouseType[] | null;
  isListLoading: boolean;
  isPopupOpen?: boolean;
  isSuccessfullyRemoved?: boolean;
  listError: ParsedAPIErrorType | null;
};

type HouseReducerAction = {
  data: HouseType[] | HouseType;
  error: ParsedAPIErrorType;
  type: keyof typeof HouseActionTypes;
};

const initialState: HouseReducerState = {
  data: null,
  isListLoading: false,
  isPopupOpen: false,
  isSuccessfullyRemoved: false,
  listError: null,
};

const housesReducer = (state = initialState, action: HouseReducerAction) => {
  switch (action.type) {
    case HouseActionTypes.GET_HOUSES_START:
      return {...state, isListLoading: true};
    case HouseActionTypes.GET_HOUSES_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case HouseActionTypes.GET_HOUSES_ERROR:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        isSuccessfullyRemoved: false,
        listError: action.error,
      };
    case HouseActionTypes.ADD_HOUSE_START:
      return {...state, isListLoading: true, isPopupOpen: true};
    case HouseActionTypes.ADD_HOUSE_DONE:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        listError: null,
        data: [action.data, ...(state?.data || [])],
      };
    case HouseActionTypes.ADD_HOUSE_ERROR:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        isSuccessfullyRemoved: false,
        listError: action.error,
      };
    case HouseActionTypes.EDIT_HOUSE_START:
      return {...state, isListLoading: true, isPopupOpen: true};
    case HouseActionTypes.EDIT_HOUSE_DONE:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        listError: null,
        data:
          state?.data?.map((item) => {
            if (item.id === (action?.data as HouseType)?.id) {
              return action.data;
            }
            return item;
          }) || state,
      };
    case HouseActionTypes.EDIT_HOUSE_ERROR:
      return {...state, isListLoading: false, isPopupOpen: false};
    case HouseActionTypes.REMOVE_HOUSE_START:
      return {...state, isListLoading: false, isPopupOpen: false};
    case HouseActionTypes.REMOVE_HOUSE_DONE:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        isSuccessfullyRemoved: true,
        listError: null,
        data: state?.data?.filter((item) => item.id !== (action?.data as HouseType)?.id),
      };
    case HouseActionTypes.REMOVE_HOUSE_ERROR:
      return {
        ...state,
        isListLoading: false,
        isPopupOpen: false,
        isSuccessfullyRemoved: false,
        listError: action.error,
      };
    default:
      return state;
  }
};

export default housesReducer;
