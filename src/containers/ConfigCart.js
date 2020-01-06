import {connect} from 'react-redux';

import {actionTriggers as cartActionTriggers} from 'flux/actions/cart-actions';
import ConfigCart from 'components/RequestQuotePage/ConfigCart';

const mapStateToProps = ({address, cart}) => {
  return {
    zipcode: address.zipcode,
    configs: cart.configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addConfig: (item) => {
      dispatch(cartActionTriggers.addConfig(item));
    },
    updateConfig: (index, config) => {
      dispatch(cartActionTriggers.updateConfig(index, config));
    },
    removeConfig: (index) => {
      dispatch(cartActionTriggers.removeConfig(index));
    },
    addConfigFromSchema: ({zipcode, data, configs, schemaCode, length}, index) => {
      dispatch(cartActionTriggers.addConfigFromSchema({
        zipcode,
        data,
        schemaCode,
        length,
        configs,
      }, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigCart);
