import {connect} from 'react-redux';

import AppCustomerQuotePage from 'components/AppCustomerQuotePage';

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCustomerQuotePage);
