import {connect} from 'react-redux';

import AppInstallerQuotePage from 'components/AppInstallerQuotePage';

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInstallerQuotePage);
