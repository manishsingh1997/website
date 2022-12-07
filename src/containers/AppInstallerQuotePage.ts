import {connect} from 'react-redux';

import AppInstallerQuotePage from '../components/AppInstallerQuotePage';
import {AuthState} from '../flux/reducers/auth';

const mapStateToProps = ({auth}: {auth: AuthState}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInstallerQuotePage);
