import {getCustomerAppointments} from '../../api/app';
import {parseAPIError} from '../../utils/api';

import {GetAppointmentDispatcher} from './types';

export enum AppointmentsActionTypes {
  GET_APPOINTMENTS_START = 'GET_APPOINTMENTS_START',
  GET_APPOINTMENTS_DONE = 'GET_APPOINTMENTS_DONE',
  GET_APPOINTMENTS_ERROR = 'GET_APPOINTMENTS_ERROR',
};

export const getAppointments = (customerGID: number) => {
  const dispatcher: GetAppointmentDispatcher = (dispatch) => {
    dispatch({
      type: AppointmentsActionTypes.GET_APPOINTMENTS_START,
    });

    const request = getCustomerAppointments(customerGID);

    request.then(response => {
      dispatch({
        type: AppointmentsActionTypes.GET_APPOINTMENTS_DONE,
        data: response.data ?? [],
      });
    });

    request.catch(error => {
      dispatch({
        type: AppointmentsActionTypes.GET_APPOINTMENTS_ERROR,
        error: parseAPIError(error),
      });
    });
  };
  return dispatcher;
};
