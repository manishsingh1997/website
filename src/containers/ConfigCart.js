import {connect} from 'react-redux';

import {
  addConfig,
  updateConfig,
  removeConfig,
  addConfigFromSchema,
} from '../flux/actions/cart';
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
      dispatch(addConfig(item));
    },
    updateConfig: (index, config) => {
      dispatch(updateConfig(index, config));
    },
    removeConfig: (index) => {
      dispatch(removeConfig(index));
    },
    addConfigFromSchema: ({zipcode, data, configs, schemaCode, length}, index) => {
      dispatch(addConfigFromSchema({
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
