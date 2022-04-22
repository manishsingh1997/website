import {connect} from 'react-redux';

import {updateLead, updateModalLead, updateModalValue, closeAddressUpdatePopup} from '../flux/actions/address';

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
      dispatch(updateLead(lead));
    },
    updateModalLead: (lead) => {
      dispatch(updateModalLead(lead));
    },
    updateModalValue: (value) => {
      dispatch(updateModalValue(value));
    },
    closeAddressUpdatePopup: () => {
      dispatch(closeAddressUpdatePopup());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdatePopup);
