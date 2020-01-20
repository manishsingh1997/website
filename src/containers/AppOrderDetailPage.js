import {connect} from 'react-redux';

import {getOrders} from 'flux/actions/app-orders';
import AppOrderDetailPage from 'components/AppOrderDetailPage';

const mapStateToProps = ({orders}) => {
  return {
    orders: orders.data,
    ordersDict: orders.data && orders.data.reduce((dict, order) => {
      return {...dict, [order.id]: order};
    }, {}),
    isLoading: orders.isListLoading,
    error: orders.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (customerGID) => {
      dispatch(getOrders(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOrderDetailPage);
