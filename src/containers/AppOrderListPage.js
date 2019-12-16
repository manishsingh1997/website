import {connect} from 'react-redux';

import AppOrderListPage from 'components/AppOrderListPage';

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOrderListPage);
