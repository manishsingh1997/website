import {connect} from 'react-redux';

import {actionTriggers} from 'actions/address-actions';
import {showUpcomingFeatures} from 'actions/upcoming-features';
import Layout from 'components/Layout';

const mapStateToProps = ({upcomingFeatures}) => {
  return {
    // address: state.address.address, // TODO: Show address in top header once tested.
    address: null,
    isShowUpcomingFeatures: upcomingFeatures.isShow,
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
    showUpcomingFeatures: () => {
      dispatch(showUpcomingFeatures());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
