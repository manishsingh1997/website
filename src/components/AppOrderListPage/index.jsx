import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {Button} from '@ergeon/core-components';

import {formatDate} from 'utils/date';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import withDataLoader from 'components/common/withDataLoader';
import DataRow from 'components/common/DataRow';

import './index.scss';

const withDataLoaderWrapper = withDataLoader({
  fetchData: (props, context) => {
    const {orders, getOrders} = props;
    const customerGID = context;
    if (!orders) {
      getOrders(customerGID);
    }
  },
  isLoading: (props) => props.isListLoading,
  getError: (props) => props.listError,
  contextType: CustomerGIDContext,
});

class AppOrdersListPage extends React.Component {

  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
    orders: PropTypes.array,
  };

  static contextType = CustomerGIDContext;

  getAddress(order) {
    return order['house']['address']['formatted_address'];
  }

  getOrderDetailLink(order) {
    const customerGID = this.context;
    return `/app/${customerGID}/orders/${order['id']}`;
  }

  renderQuote(orderID, quote) {
    const customerGID = this.context;
    return (
      <div>
        <Link to={`/app/${customerGID}/orders/${orderID}/quotes/${quote['id']}`}>
          #{quote['id']}
        </Link> ({quote['status_display']})
      </div>
    );
  }

  renderQuotes(order) {
    const quotes = order['quotes'].filter(quote => quote['sent_to_customer_at']);
    return quotes.length > 0 ? quotes.map(quote => this.renderQuote(order['id'], quote)): null;
  }

  render() {
    const {orders} = this.props;

    return (
      <div className="orders-page">
        <h4 className="flex-row align-center">
          <div>Orders</div>
          <div>
            <Link to="/request-quote">
              <Button
                size="small"
                type="submit">
                Add Order
              </Button>
            </Link>
          </div>
        </h4>
        <div>
          {orders && orders.map(order => (
            <div className="app-subcard card shadow border padding-20 spacing before__is-12" key={`order-${order.id}`}>
              <h6 className="flex-row align-center">
                <div>{order['product']['name']}</div>
                <div>
                  <Link to={this.getOrderDetailLink(order)}>
                    <Button
                      flavor="cta"
                      size="small"
                      type="submit">
                      Order Details
                    </Button>
                  </Link>
                </div>
              </h6>
              <DataRow title="Status" value={order['status_display']} />
              <DataRow title="Ordered on" value={formatDate(order['ordered_at'])} />
              <DataRow title="Address" value={this.getAddress(order)} />
              <DataRow title="Quotes" value={this.renderQuotes(order)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withDataLoaderWrapper(AppOrdersListPage);
