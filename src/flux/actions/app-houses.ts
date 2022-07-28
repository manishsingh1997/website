import {addCustomerHouse, getCustomerHouses} from '../../api/app';
import {AddAddressProps} from '../../components/AppHouseListPage/types';
import {parseAPIError} from '../../utils/api';
import {ErrorResponse} from '../../utils/types';
import {GetHouseDispatcher, SetHouseDispatcher} from './types';

export enum HouseActionTypes {
  GET_HOUSES_START = 'GET_HOUSES_START',
  GET_HOUSES_DONE = 'GET_HOUSES_DONE',
  GET_HOUSES_ERROR = 'GET_HOUSES_ERROR',
  ADD_HOUSE_START = 'ADD_HOUSE_START',
  ADD_HOUSE_DONE = 'ADD_HOUSE_DONE',
  ADD_HOUSE_ERROR = 'ADD_HOUSE_ERROR',
}

export const getHouses = (customerGID: number) => {
  const dispatcher: GetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.GET_HOUSES_START,
    });

    try {
      const response = getCustomerHouses(customerGID);
      response.then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.GET_HOUSES_DONE,
          data: axiosResponse.data,
        });
      });
    } catch (error) {
      const errorResponse = error as {response: ErrorResponse};
      dispatch({
        type: HouseActionTypes.GET_HOUSES_ERROR,
        error: parseAPIError(errorResponse),
      });
    }
  };
  return dispatcher;
};

export const addHouse = (customerGID: number, data: AddAddressProps) => {
  const dispatcher: SetHouseDispatcher = (dispatch) => {
    dispatch({
      type: HouseActionTypes.ADD_HOUSE_START,
    });

    try {
      const response = addCustomerHouse(customerGID, data);
      response.then((axiosResponse) => {
        dispatch({
          type: HouseActionTypes.ADD_HOUSE_DONE,
          data: axiosResponse.data,
        });
      });
    } catch (error) {
      const errorResponse = error as {response: ErrorResponse};
      dispatch({
        type: HouseActionTypes.ADD_HOUSE_ERROR,
        error: parseAPIError(errorResponse),
      });
    }
  };
  return dispatcher;
};
