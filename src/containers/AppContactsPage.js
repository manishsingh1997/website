import {connect} from 'react-redux';

import {getContacts} from 'flux/actions/app-contacts';
import AppContactsPage from 'components/AppContactsPage';
import {getCurrentUser, actionTypes as authActionTypes} from '../flux/actions/auth';
import {actionTypes as contactsActionTypes} from '../flux/actions/app-contacts';
import {authService} from '../utils/auth';

const mapStateToProps = ({contacts}) => {
  return {
    contacts: contacts.data,
    isListLoading: contacts.isListLoading,
    listError: contacts.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    getContacts: (customerGID) => {
      dispatch(getContacts(customerGID));
    },
    updateContacts: (data) => {
      dispatch({
        type: contactsActionTypes.GET_CONTACTS_DONE,
        data,
      });
    },
    updateUser: async(newUserData) => {
      const user = await authService.getUser();
      dispatch({
        type: authActionTypes.AUTH_GET_USER_DONE,
        user: {
          ...user,
          ...newUserData,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContactsPage);
