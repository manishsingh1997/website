import {connect} from 'react-redux';

import {actionTriggers as addressActionTriggers} from 'flux/actions/address-actions';

import AddressUpdatePopup from 'components/Layout/AddressUpdatePopup';

const mapStateToProps = ({address}) => {
  return {
    open: address.updateModalOpened,
    lead: address.updateModalLead,
    value: address.updateModalValue,
    product: address.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLead: (lead) => {
      dispatch(addressActionTriggers.updateLead(lead));
    },
    updateModalLead: (lead) => {
      dispatch(addressActionTriggers.updateModalLead(lead));
    },
    updateModalValue: (value) => {
      dispatch(addressActionTriggers.updateModalValue(value));
    },
    closeAddressUpdatePopup: () => {
      dispatch(addressActionTriggers.closeAddressUpdatePopup());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdatePopup);
