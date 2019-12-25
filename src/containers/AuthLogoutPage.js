import {connect} from 'react-redux';

import {logout} from 'flux/actions/auth';
import AuthLogoutPage from 'components/AuthLogoutPage';

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      return dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogoutPage);
