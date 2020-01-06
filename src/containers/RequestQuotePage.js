import {connect} from 'react-redux';

import {actionTriggers as addressActionTriggers} from 'flux/actions/address-actions';
import {actionTriggers as cartActionTriggers} from 'flux/actions/cart-actions';
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
    updateLead: (lead) => {
      dispatch(addressActionTriggers.updateLead(lead));
    },
    openAddressUpdatePopup: () => {
      dispatch(addressActionTriggers.openAddressUpdatePopup());
    },
    addConfig: (item) => {
      dispatch(cartActionTriggers.addConfig(item));
    },
    updateLeadAndConfig: ({address, product, zipcode, data, schemaCode, length, configs}) => {
      let updateLead = null;
      if (address) {
        updateLead = dispatch(addressActionTriggers.updateLeadFromAddress({
          address,
          product,
          zipcode,
        }));
      }

      if (data && schemaCode) {
        if (updateLead) {
          updateLead.then(zipcode => dispatch(cartActionTriggers.addConfigFromSchema({
            zipcode,
            data,
            schemaCode,
            length,
            configs,
          })));
        } else {
          dispatch(cartActionTriggers.addConfigFromSchema({
            zipcode,
            data,
            schemaCode,
            length,
            configs,
          }));
        }
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestQuotePage);
