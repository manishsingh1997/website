import {connect} from 'react-redux';

import {actionTriggers} from 'actions/address-actions';
import Layout from 'components/Layout';

const mapStateToProps = () => {
  return {
    // address: state.address.address, // TODO: Show address in top header once tested.
    address: null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actionTriggers.logout());
    },
    openAddressUpdatePopup: () => {
      dispatch(actionTriggers.openAddressUpdatePopup());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
