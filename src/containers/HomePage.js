import {connect} from 'react-redux';

import HomePage from 'components/HomePage';

const mapStateToProps = ({conditionalFeatures}) => {
  return {
    isChristmasTime: conditionalFeatures.isChristmasTime,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
