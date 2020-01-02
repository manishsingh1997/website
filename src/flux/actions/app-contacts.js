import {getCustomerContacts} from 'api/app';
import {parseAPIError} from 'utils/api';

export const actionTypes = {
  'GET_CONTACTS_START': 'GET_CONTACTS_START',
  'GET_CONTACTS_DONE': 'GET_CONTACTS_DONE',
  'GET_CONTACTS_ERROR': 'GET_CONTACTS_ERROR',
};

export const getContacts = (customerGID) => {
  return async function(dispatch) {
    dispatch({
      type: actionTypes.GET_CONTACTS_START,
    });

    try {
      const response = await getCustomerContacts(customerGID);
      dispatch({
        type: actionTypes.GET_CONTACTS_DONE,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_CONTACTS_ERROR,
        error: parseAPIError(error),
      });
    }
  };
};
