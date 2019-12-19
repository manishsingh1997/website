import {connect} from 'react-redux';

import {getCurrentUser} from 'actions/auth';
import {showUpcomingFeatures} from 'actions/upcoming-features';
import Layout from 'components/Layout';

const mapStateToProps = ({auth, upcomingFeatures}) => {
  return {
    isShowUpcomingFeatures: upcomingFeatures.isShow,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUpcomingFeatures: () => {
      dispatch(showUpcomingFeatures());
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
