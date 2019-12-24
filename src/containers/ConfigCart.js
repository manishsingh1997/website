import {connect} from 'react-redux';

import {actionTriggers as cartActionTriggers} from 'actions/cart-actions';
import ConfigCart from 'components/RequestQuotePage/ConfigCart';

const mapStateToProps = ({address, cart}) => {
  return {
    address: address.address,
    configs: cart.configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateConfig: (index, item) => {
      dispatch(cartActionTriggers.updateConfig(index, item));
    },
    removeConfig: (index) => {
      dispatch(cartActionTriggers.removeConfig(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigCart);
