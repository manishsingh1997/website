import {connect} from 'react-redux';

import AddressForm from 'components/HomePage/AddressForm';
import {updateLead} from '../flux/actions/address';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLead: (lead) => {
      return dispatch(updateLead(lead));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
