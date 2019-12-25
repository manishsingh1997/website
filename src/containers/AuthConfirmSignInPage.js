import {connect} from 'react-redux';

import {authenticateUserWithCode} from 'flux/actions/auth';
import AuthConfirmSignInPage from 'components/AuthConfirmSignInPage';

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUserWithCode: (code) => {
      return dispatch(authenticateUserWithCode(code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthConfirmSignInPage);
