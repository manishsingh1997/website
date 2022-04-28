import {getCustomerHouses} from '../../api/app';
import {parseAPIError} from '../../utils/api';
import {ErrorResponse} from '../../utils/types';
import {GetHouseDispatcher} from './types';

export const actionTypes = {
  GET_HOUSES_START: 'GET_HOUSES_START',
  GET_HOUSES_DONE: 'GET_HOUSES_DONE',
  GET_HOUSES_ERROR: 'GET_HOUSES_ERROR',
};

export const getHouses = (customerGID: number) => {
  const dispatcher: GetHouseDispatcher = (dispatch) => {
    dispatch({
      type: actionTypes.GET_HOUSES_START,
    });

    try {
      const response = getCustomerHouses(customerGID);
      response.then((axiosResponse) => {
        dispatch({
          type: actionTypes.GET_HOUSES_DONE,
          data: axiosResponse.data,
        });
      })

    } catch (error) {
      const errorResponse = error as {response: ErrorResponse};
      dispatch({
        type: actionTypes.GET_HOUSES_ERROR,
        error: parseAPIError(errorResponse),
      });
    }
  }
  return dispatcher;
};
