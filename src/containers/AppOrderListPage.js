import {connect} from 'react-redux';

import {getOrders} from 'flux/actions/app-orders';
import {updateLeadFromAddress} from 'flux/actions/address';
import AppOrderListPage from 'components/AppOrderListPage';

const mapStateToProps = ({auth: {user}, orders, address}) => {
  return {
    orders: orders.data,
    isListLoading: orders.isListLoading,
    listError: orders.listError,
    address: user['main_address'] ? user['main_address']['formatted_address'] : address.address,
    product: address.product,
    zipcode: address.zipcode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (customerGID) => {
      dispatch(getOrders(customerGID));
    },
    updateLeadFromAddress: ({address, product, zipcode}) => {
      dispatch(updateLeadFromAddress({address, product, zipcode}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOrderListPage);
