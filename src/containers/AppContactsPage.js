import {connect} from 'react-redux';

import {getContacts} from 'flux/actions/app-contacts';
import AppContactsPage from 'components/AppContactsPage';

const mapStateToProps = ({contacts}) => {
  return {
    contacts: contacts.data,
    isListLoading: contacts.isListLoading,
    listError: contacts.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: (customerGID) => {
      dispatch(getContacts(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContactsPage);
