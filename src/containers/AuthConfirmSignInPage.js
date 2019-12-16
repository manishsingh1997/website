import {connect} from 'react-redux';

import {actionTriggers as authActionTriggers} from 'actions/auth';
import AuthConfirmSignInPage from 'components/AuthConfirmSignInPage';

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUserWithCode: (code) => {
      return dispatch(authActionTriggers.authenticateUserWithCode(code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthConfirmSignInPage);
