import { Action, Dispatch } from 'redux';
import {connect} from 'react-redux';
import {addConfig, updateConfig, removeConfig, addConfigFromSchema} from '../flux/actions/cart';
import { Address, Config, LeadConfigType } from '../components/RequestQuotePage/types';
import ConfigCart from '../components/RequestQuotePage/ConfigCart';

const mapStateToProps = ({address, cart}: {address: Address, cart: {configs: Config[]}}) => {
  return {
    zipcode: address.zipcode,
    configs: cart.configs || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    addConfig: (item: Config) => {
      dispatch(addConfig(item));
    },
    updateConfig: (index: number, config: Config) => {
      dispatch(updateConfig(index, config));
    },
    removeConfig: (index: number) => {
      dispatch(removeConfig(index));
    },
    addConfigFromSchema: ({zipcode, data, configs, schemaCode, length, grade}: LeadConfigType, index: number) => {
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
