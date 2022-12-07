import {connect} from 'react-redux';

import {authenticateUserWithCode, resendLink} from 'flux/actions/auth';
import AuthConfirmSignInPage from 'components/AuthConfirmSignInPage';

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUserWithCode: (code) => {
      return dispatch(authenticateUserWithCode(code));
    },
    resendLink: (otp) => {
      return dispatch(resendLink(otp));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthConfirmSignInPage);
