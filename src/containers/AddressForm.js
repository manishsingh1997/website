import {connect} from 'react-redux';

import {actionTriggers} from 'actions/address-actions';

import AddressForm from 'components/HomePage/AddressForm';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLead: (lead) => {
      dispatch(actionTriggers.updateLead(lead));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
