import {connect} from 'react-redux';

import Success from 'components/common/Success';

const mapStateToProps = ({conditionalFeatures}) => {
  return {
    isChristmasTime: conditionalFeatures.isChristmasTime,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
