import {Action, Dispatch} from 'redux';

import {connect} from 'react-redux';

import AppMenuCustomerQuotePage from '../components/AppQuoteDetailPage/AppMenuCustomerQuotePage';
import {setPDFHeaderPhoneNumber} from '../flux/actions/layout';
import {AppCustomerQuotePageProps} from '../components/AppCustomerQuotePage/types';

const mapStateToProps = ({auth, layout}: AppCustomerQuotePageProps) => {
  return {
    auth,
    layout,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPDFHeaderPhoneAction: (phone: number) => dispatch(setPDFHeaderPhoneNumber(phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenuCustomerQuotePage);
