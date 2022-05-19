import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@ergeon/core-components';
import {formatDate} from '../../utils/date';
import {getOrderDetailURL, getQuoteDetailURL} from '../../utils/urls';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import DataRow from '../../components/common/DataRow';
import AppPage from '../../components/common/AppPage';
import AppSubCard from '../../components/common/AppSubCard';
import {filterQuotesByStatus, DEFAULT_QUOTE_FILTER} from '../../utils/app-order';
import {getFormattedAddress} from '../../utils/app-house';
import {Order, Quote} from '../types';
import {AppOrdersListPageProps} from './types';

export default class AppOrdersListPage extends Component <AppOrdersListPageProps> {
  static contextType = CustomerGIDContext;

  fetchData() {
    const {getOrders} = this.props;
    const customerGID = this.context;
    getOrders(customerGID);
  }

  renderQuote(quote: Quote) {
    const customerGID = this.context;
    return (
      <div key={`quote-${quote['id']}`}>
        <Link to={getQuoteDetailURL(customerGID, quote['secret'])}>#{quote['id']}</Link> ({quote['status']['label']})
      </div>
    );
  }

  renderQuotes(order: Order) {
    const quotes = filterQuotesByStatus(order['quotes'], DEFAULT_QUOTE_FILTER);
    return quotes.length > 0 ? quotes.map((quote: Quote) => this.renderQuote(quote)) : null;
  }

  renderListElementHeader(order: Order) {
    const customerGID = this.context;

    return (
      <Fragment>
        <div>{order['product']['name']}</div>
        <div>
          <Link to={getOrderDetailURL(customerGID, order['id'])}>
            <Button flavor="cta" size="small" type="submit">
              Order Details
            </Button>
          </Link>
        </div>
      </Fragment>
    );
  }

  renderListElementContent(order: Order) {
    return (
      <Fragment>
        <DataRow title="Order" value={`#${order['id']}`} />
        <DataRow title="Status" value={order['customer_deal_status']} />
        <DataRow title="Ordered on" value={formatDate(order['ordered_at'])} />
        <DataRow title="Address" value={getFormattedAddress(order['house'])} />
        <DataRow title="Quotes" value={this.renderQuotes(order)} />
      </Fragment>
    );
  }

  renderHeader() {
    return (
      <Fragment>
        <div>Orders</div>
      </Fragment>
    );
  }

  renderContent() {
    const {orders} = this.props;

    return (
      <Fragment>
        {orders &&
          orders.map((order) => (
            <AppSubCard
              key={`order-${order.id}`}
              renderContent={this.renderListElementContent.bind(this, order)}
              renderHeader={this.renderListElementHeader.bind(this, order)}
            />
          ))}
      </Fragment>
    );
  }

  render() {
    return (
      <AppPage
        error={this.props.listError}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isListLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={this.renderHeader.bind(this)}
      />
    );
  }
}
