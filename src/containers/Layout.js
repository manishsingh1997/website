import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {getCurrentUser} from 'flux/actions/auth';
import Layout from 'components/Layout';

const mapStateToProps = ({auth, layout, city}) => ({
  auth,
  city,
  phoneNumber: layout.phoneNumber,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
