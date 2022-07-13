import {connect} from 'react-redux';

import ConfigCart from 'components/RequestQuotePage/ConfigCart';
import {addConfig, updateConfig, removeConfig, addConfigFromSchema} from '../flux/actions/cart';

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
    addConfigFromSchema: ({zipcode, data, configs, schemaCode, length, grade}, index) => {
      dispatch(
        addConfigFromSchema(
          {
            zipcode,
            data,
            schemaCode,
            length,
            grade,
            configs,
          },
          index
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigCart);
