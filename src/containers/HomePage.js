import {connect} from 'react-redux';

import HomePage from 'components/HomePage';

const mapStateToProps = ({conditionalFeatures}) => {
  return {
    isShowUpcomingFeatures: conditionalFeatures.isShowUpcomingFeatures,
    isShowChristmasFeatures: conditionalFeatures.isShowChristmasFeatures,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
