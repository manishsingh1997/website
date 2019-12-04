import {connect} from 'react-redux';

import {actionTriggers as addressActionTriggers} from 'actions/address-actions';
import RequestQuote from 'new-components/RequestQuote';

const mapStateToProps = ({address}) => {
  return {
    address: address.address,
    lead: address.lead,
    product: address.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAddress: (lead) => {
      dispatch(addressActionTriggers.updateAddress(lead));
    },
    openAddressUpdatePopup: () => {
      dispatch(addressActionTriggers.openAddressUpdatePopup());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestQuote);
