import {CityDispatcher} from './types';

export const actionTypes = {
  GET_CITY_START: 'GET_CITY_START',
  GET_CITY_DONE: 'GET_CITY_DONE',
  GET_CITY_ERROR: 'GET_CITY_ERROR',
  RESET_CITY: 'RESET_CITY',
};

export const getCity = (citySlug: string) => {
  const dispatcher: CityDispatcher = (dispatch) => {
    dispatch({
      type: actionTypes.GET_CITY_START,
    });

    import(`../../data/cities/${citySlug}.json`)
      .then((module) => {
        dispatch({
          type: actionTypes.GET_CITY_DONE,
          data: module.default,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_CITY_ERROR,
          error,
        });
      });
  };
  return dispatcher;
};

export const resetCity = () => {
  const dispatcher: CityDispatcher = (dispatch) => {
    dispatch({
      type: actionTypes.RESET_CITY,
    });
  };
  return dispatcher;
};
