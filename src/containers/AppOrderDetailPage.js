import {connect} from 'react-redux';

import {getOrder} from 'flux/actions/app-orders';
import AppOrderDetailPage from 'components/AppOrderDetailPage';

const mapStateToProps = ({orders}) => {
  return {
    orders: orders.itemData,
    isLoading: orders.isItemLoading,
    error: orders.itemError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (customerGID, orderId) => {
      dispatch(getOrder(customerGID, orderId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOrderDetailPage);
