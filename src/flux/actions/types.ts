import {Action} from 'redux';

import {Appointment} from '../../components/AppAppointmentsListPage/types';
import {City} from '../../components/AppCityPage/types';
import {HouseType} from '../../components/types';
import {ParsedAPIErrorType} from '../../utils/types';

import {HouseActionTypes} from './app-houses';

export interface GetAppointmentRequest {
  type?: string;
  data?: Appointment[];
  error?: ParsedAPIErrorType;
}

export type GetAppointmentDispatcher = (dispatch: (props: GetAppointmentRequest) => Action) => void;

export interface HouseRequest {
  type?: string;
  data?: HouseType[];
  error?: ParsedAPIErrorType;
}

export type GetHouseDispatcher = (dispatch: (props: HouseRequest) => Action) => void;

export type SetHouseDispatcher = (dispatch: (props: HouseRequest) => Action) => void;

export type HouseAction = {type: HouseActionTypes; data: HouseType};

type CityRequest = {
  type?: string;
  data?: City | null;
  error?: Error;
};

export type CityDispatcher = (dispatch: (props: CityRequest) => Action) => void;

type QuoteRequest = unknown;

export type GetQuotesDispatcher = (dispatch: (props: QuoteRequest) => Action) => void;
