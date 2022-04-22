import {getCustomerHouses} from 'api/app';
import {parseAPIError} from 'utils/api';

export const actionTypes = {
  GET_HOUSES_START: 'GET_HOUSES_START',
  GET_HOUSES_DONE: 'GET_HOUSES_DONE',
  GET_HOUSES_ERROR: 'GET_HOUSES_ERROR',
};

export const getHouses = (customerGID) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.GET_HOUSES_START,
    });

    try {
      const response = await getCustomerHouses(customerGID);
      dispatch({
        type: actionTypes.GET_HOUSES_DONE,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_HOUSES_ERROR,
        error: parseAPIError(error),
      });
    }
  };
};
