import {connect} from 'react-redux';

import {getOrders} from 'flux/actions/app-orders';
import AppOrderListPage from 'components/AppOrderListPage';

const mapStateToProps = ({orders}) => {
  return {
    orders: orders.data,
    isListLoading: orders.isListLoading,
    listError: orders.listError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (customerGID) => {
      dispatch(getOrders(customerGID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOrderListPage);
