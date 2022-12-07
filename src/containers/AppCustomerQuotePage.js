import {connect} from 'react-redux';

import AppCustomerQuotePage from 'components/AppCustomerQuotePage';

import {setPDFHeaderPhoneNumber} from '../flux/actions/layout';

const mapStateToProps = ({auth, layout}) => {
  return {
    auth,
    layout,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPDFHeaderPhoneAction: (phone) => dispatch(setPDFHeaderPhoneNumber(phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCustomerQuotePage);
