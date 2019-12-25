import {connect} from 'react-redux';

import {getCurrentUser} from 'flux/actions/auth';
import Layout from 'components/Layout';

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
