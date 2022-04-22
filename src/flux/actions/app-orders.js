import {getCustomerOrders, getCustomerOrderDetails} from 'api/app';
import {parseAPIError} from 'utils/api';

export const actionTypes = {
  GET_ORDERS_START: 'GET_ORDERS_START',
  GET_ORDERS_DONE: 'GET_ORDERS_DONE',
  GET_ORDERS_ERROR: 'GET_ORDERS_ERROR',
  GET_ORDER_START: 'GET_ORDER_START',
  GET_ORDER_DONE: 'GET_ORDER_DONE',
  GET_ORDER_ERROR: 'GET_ORDER_ERROR',
};

export const getOrders = (customerGID) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.GET_ORDERS_START,
    });

    try {
      const response = await getCustomerOrders(customerGID);
      dispatch({
        type: actionTypes.GET_ORDERS_DONE,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ORDERS_ERROR,
        error: parseAPIError(error),
      });
    }
  };
};

export const getOrder = (customerGID, orderId) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.GET_ORDER_START,
    });

    try {
      const response = await getCustomerOrderDetails(customerGID, orderId);
      dispatch({
        type: actionTypes.GET_ORDER_DONE,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ORDER_ERROR,
        error: parseAPIError(error),
      });
    }
  };
};
