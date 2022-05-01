import {getCustomerAppointments} from 'api/app';
import {parseAPIError} from 'utils/api.ts';

export const actionTypes = {
  GET_APPOINTMENTS_START: 'GET_APPOINTMENTS_START',
  GET_APPOINTMENTS_DONE: 'GET_APPOINTMENTS_DONE',
  GET_APPOINTMENTS_ERROR: 'GET_APPOINTMENTS_ERROR',
};

export const getAppointments = (customerGID) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.GET_APPOINTMENTS_START,
    });

    try {
      const response = await getCustomerAppointments(customerGID);
      dispatch({
        type: actionTypes.GET_APPOINTMENTS_DONE,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_APPOINTMENTS_ERROR,
        error: parseAPIError(error),
      });
    }
  };
};
