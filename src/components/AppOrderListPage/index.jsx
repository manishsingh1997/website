import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {Button} from '@ergeon/core-components';

import {formatDate} from 'utils/date';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';

export default class AppOrdersListPage extends React.Component {

  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
    orders: PropTypes.array,
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {orders, getOrders} = this.props;
    const customerGID = this.context;
    if (!orders) {
      getOrders(customerGID);
    }
  }

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

  renderListElementHeader(order) {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  renderListElementContent(order) {
    return (
      <React.Fragment>
        <DataRow title="Order" value={`#${order['id']}`} />
        <DataRow title="Status" value={order['status_display']} />
        <DataRow title="Ordered on" value={formatDate(order['ordered_at'])} />
        <DataRow title="Address" value={this.getAddress(order)} />
        <DataRow title="Quotes" value={this.renderQuotes(order)} />
      </React.Fragment>
    );
  }

  renderHeader() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  renderContent() {
    const {orders} = this.props;

    return (
      <React.Fragment>
        {orders && orders.map(order => (
          <AppSubCard
            key={`order-${order.id}`}
            renderContent={this.renderListElementContent.bind(this, order)}
            renderHeader={this.renderListElementHeader.bind(this, order)} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <AppPage
        error={this.props.listError}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isListLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={this.renderHeader.bind(this)} />
    );
  }

}
