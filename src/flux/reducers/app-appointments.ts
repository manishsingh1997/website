import {Appointment} from '../../components/AppAppointmentsListPage/types';
import {ParsedAPIErrorType} from '../../utils/types';
import {AppointmentsActionTypes} from '../actions/app-appointments';

type AppointmentsReducerState = {
  data: Appointment[] | null,
  isListLoading: boolean,
  listError: ParsedAPIErrorType | null,
};

type AppointmentsReducerAction = {
  type: string;
  data: Appointment[];
  error: ParsedAPIErrorType;
}

const initialState: AppointmentsReducerState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const appointmentsReducer = (
  state: AppointmentsReducerState = initialState,
  action: AppointmentsReducerAction,
) => {
  switch (action.type) {
    case AppointmentsActionTypes.GET_APPOINTMENTS_START:
      return {...state, isListLoading: true};
    case AppointmentsActionTypes.GET_APPOINTMENTS_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case AppointmentsActionTypes.GET_APPOINTMENTS_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default appointmentsReducer;
