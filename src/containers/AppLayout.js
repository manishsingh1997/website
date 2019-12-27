import {connect} from 'react-redux';

import AppLayout from 'components/AppLayout';

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
