import { connect } from 'react-redux';

import TellUsForm from 'components/RequestQuotePage/TellUsForm';
import { updateLead, updateProduct, updateLeadFromAddress, openAddressUpdatePopup } from '../flux/actions/address';
import { addConfig, addConfigFromSchema } from '../flux/actions/cart';

const mapStateToProps = ({ address, cart, auth }) => {
  return {
    address: address.address,
    auth,
    lead: address.lead,
    product: address.product,
    zipcode: address.zipcode,
    configs: cart.configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLead: (lead) => {
      dispatch(updateLead(lead));
    },
    updateProduct: (product) => {
      dispatch(updateProduct(product));
    },
    openAddressUpdatePopup: () => {
      dispatch(openAddressUpdatePopup());
    },
    addConfig: (item) => {
      dispatch(addConfig(item));
    },
    updateLeadAndConfig: ({ address, product, zipcode, data, schemaCode, length, grade, configs }) => {
      let updateLead = null;
      if (address) {
        updateLead = dispatch(
          updateLeadFromAddress({
            address,
            product,
            zipcode,
          })
        );
      }

      if (data && schemaCode) {
        if (updateLead) {
          updateLead.then((zipcode) =>
            dispatch(
              addConfigFromSchema({
                zipcode,
                data,
                schemaCode,
                length,
                grade,
                configs,
              })
            )
          );
        } else {
          dispatch(
            addConfigFromSchema({
              zipcode,
              data,
              schemaCode,
              length,
              grade,
              configs,
            })
          );
        }
      }
    },
    updateLeadFromAddress: ({ address, product, zipcode }) => {
      dispatch(updateLeadFromAddress({ address, product, zipcode }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TellUsForm);
