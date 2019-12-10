import {connect} from 'react-redux';

import {actionTriggers as addressActionTriggers} from 'actions/address-actions';
import {actionTriggers as cartActionTriggers} from 'actions/cart-actions';
import RequestQuotePage from 'components/RequestQuotePage';

const mapStateToProps = ({address, cart}) => {
  return {
    address: address.address,
    lead: address.lead,
    product: address.product,
    zipcode: address.zipcode,
    configs: cart.configs,
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
    addConfig: (item) => {
      dispatch(cartActionTriggers.addConfig(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestQuotePage);
