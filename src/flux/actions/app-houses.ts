import {addCustomerHouse, editCustomerHouse, removeCustomerHouse, getCustomerHouses} from '../../api/app';
import {AddAddressProps} from '../../components/AppHouseListPage/types';
import {parseAPIError} from '../../utils/api';
import {GetHouseDispatcher, SetHouseDispatcher} from './types';

export enum HouseActionTypes {
  GET_HOUSES_START = 'GET_HOUSES_START',
  GET_HOUSES_DONE = 'GET_HOUSES_DONE',
  GET_HOUSES_ERROR = 'GET_HOUSES_ERROR',
  ADD_HOUSE_START = 'ADD_HOUSE_START',
  ADD_HOUSE_DONE = 'ADD_HOUSE_DONE',
  ADD_HOUSE_ERROR = 'ADD_HOUSE_ERROR',
  EDIT_HOUSE_START = 'EDIT_HOUSE_START',
  EDIT_HOUSE_DONE = 'EDIT_HOUSE_DONE',
  EDIT_HOUSE_ERROR = 'EDIT_HOUSE_ERROR',
  REMOVE_HOUSE_START = 'REMOVE_HOUSE_START',
  REMOVE_HOUSE_DONE = 'REMOVE_HOUSE_DONE',
  REMOVE_HOUSE_ERROR = 'REMOVE_HOUSE_ERROR',
}

export const getHouses = (customerGID: number) => {
  const dispatcher: GetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.GET_HOUSES_START,
    });
    const response = getCustomerHouses(customerGID);
    response
      .then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.GET_HOUSES_DONE,
          data: axiosResponse.data,
        });
      })
      .catch((errorResponse) => {
        const error = parseAPIError(errorResponse);
        console.error(error.data);
        dispatch({
          type: HouseActionTypes.EDIT_HOUSE_ERROR,
          error: parseAPIError(errorResponse),
        });
      });
  };
  return dispatcher;
};

export const addHouse = (customerGID: number, data: AddAddressProps) => {
  const dispatcher: SetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.ADD_HOUSE_START,
    });
    const response = addCustomerHouse(customerGID, data);
    response
      .then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.ADD_HOUSE_DONE,
          data: axiosResponse.data,
        });
      })
      .catch((errorResponse) => {
        const error = parseAPIError(errorResponse);
        console.error(error.data);
        dispatch({
          type: HouseActionTypes.EDIT_HOUSE_ERROR,
          error,
        });
      });
  };
  return dispatcher;
};

export const editHouse = (customerGID: number, houseId: string | number, data: AddAddressProps) => {
  const dispatcher: SetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.EDIT_HOUSE_START,
    });
    const response = editCustomerHouse(customerGID, houseId, data);
    response
      .then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.EDIT_HOUSE_DONE,
          data: axiosResponse.data,
        });
      })
      .catch((errorResponse) => {
        const error = parseAPIError(errorResponse);
        console.error(error.data);
        dispatch({
          type: HouseActionTypes.EDIT_HOUSE_ERROR,
          error,
        });
      });
  };
  return dispatcher;
};

export const removeHouse = (customerGID: number, houseId: string | number) => {
  const dispatcher: SetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.REMOVE_HOUSE_START,
    });
    const response = removeCustomerHouse(customerGID, houseId);
    response
      .then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.REMOVE_HOUSE_DONE,
          data: axiosResponse.data,
        });
      })
      .catch((errorResponse) => {
        const error = parseAPIError(errorResponse);
        console.error(error.data);
        dispatch({
          type: HouseActionTypes.EDIT_HOUSE_ERROR,
          error,
        });
      });
  };
  return dispatcher;
};
