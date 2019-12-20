import {connect} from 'react-redux';

import {getCurrentUser} from 'actions/auth';
import {showChristmasFeaturesIfReady, showUpcomingFeaturesIfRequested} from 'actions/conditional-features';
import Layout from 'components/Layout';

const mapStateToProps = ({auth, conditionalFeatures}) => {
  return {
    isUpcomingFeaturesEnabled: conditionalFeatures.isUpcomingFeaturesEnabled,
    isChristmasTime: conditionalFeatures.isChristmasTime,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUpcomingFeaturesIfRequested: (parsedQuery) => {
      dispatch(showUpcomingFeaturesIfRequested(parsedQuery));
    },
    showChristmasFeaturesIfReady: (date) => {
      dispatch(showChristmasFeaturesIfReady(date));
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
