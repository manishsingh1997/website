import {HouseType} from '../../components/types';
import {HouseActionTypes} from '../actions/app-houses';

export type SelectedHouseReducerState = {
  data: HouseType | null;
};

type SelectedHouseReducerAction = {
  data: HouseType | null;
  type: typeof HouseActionTypes.SET_SELECTED_HOUSE;
};

const initialSelectedHouse: SelectedHouseReducerState = {
  data: null,
};

const selectedHouseReducer = (
  state = initialSelectedHouse,
  action: SelectedHouseReducerAction
): SelectedHouseReducerState => {
  switch (action.type) {
    case HouseActionTypes.SET_SELECTED_HOUSE:
      return {...state, data: action.data};
    default:
      return state;
  }
};

export default selectedHouseReducer;
