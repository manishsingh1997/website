import {Action} from 'redux';
import {Appointment} from '../../components/AppAppointmentsListPage/types';
import {City} from '../../components/AppCityPage/types';
import {HouseType} from '../../components/types';
import {ParsedAPIErrorType} from '../../utils/types';

export interface GetAppointmentRequest {
  type?: string;
  data?: Appointment[];
  error?: ParsedAPIErrorType;
}

export type GetAppointmentDispatcher = (dispatch: (props: GetAppointmentRequest) => Action) => void;

export interface GetHouseRequest {
  type?: string;
  data?: HouseType[];
  error?: ParsedAPIErrorType;
}

export type GetHouseDispatcher = (dispatch: (props: GetHouseRequest) => Action) => void;

type CityRequest = {
  type?: string;
  data?: City | null;
  error?: Error;
};

export type CityDispatcher = (dispatch: (props: CityRequest) => Action) => void;
