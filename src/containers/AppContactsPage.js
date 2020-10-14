import {connect} from 'react-redux';

import {getContacts} from 'flux/actions/app-contacts';
import AppContactsPage from 'components/AppContactsPage';
import AppContactsPageEditable from 'components/AppContactsPageEditable';
import {getCurrentUser} from '../flux/actions/auth';

import {showUpcomingFeatures} from '../utils/utils';

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
  };
};

const Page = showUpcomingFeatures() ? AppContactsPageEditable : AppContactsPage;
export default connect(mapStateToProps, mapDispatchToProps)(Page);
