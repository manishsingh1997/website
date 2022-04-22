import {actionTypes} from '../actions/app-contacts';

const initialState = {
  data: null,
  isListLoading: false,
  listError: null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTACTS_START:
      return {...state, isListLoading: true};
    case actionTypes.GET_CONTACTS_DONE:
      return {...state, isListLoading: false, listError: null, data: action.data};
    case actionTypes.GET_CONTACTS_ERROR:
      return {...state, isListLoading: false, listError: action.error};
    default:
      return state;
  }
};

export default contactsReducer;
