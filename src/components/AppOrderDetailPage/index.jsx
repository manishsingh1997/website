import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import Select from 'react-select';

import {Button} from '@ergeon/core-components';
import contactIcon from '@ergeon/core-components/src/assets/icon-arrow-left.svg';

import {formatDate, formatDateAndTime} from 'utils/date';
import {filterQuotesSentToCustomer, formatPrice, QUOTE_FILTERS} from 'utils/app-order';
import {getQuoteDetailURL} from 'utils/urls';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';

import './index.scss';

export default class AppOrderDetailPage extends React.Component {

  static propTypes = {
    error: PropTypes.object,
    getOrders: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.object,
    orders: PropTypes.array,
    ordersDict: PropTypes.object,
  };

  state = {
    selectedOption: QUOTE_FILTERS[0],
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {orders, getOrders} = this.props;
    const customerGID = this.context;
    if (!orders) {
      getOrders(customerGID);
    }
  }

  getOrder() {
    const {orders} = this.props;
    if (!orders) return null;
    const orderId = this.props.match.params.orderId;
    return this.props.ordersDict[orderId];
  }

  getAddress(order) {
    return order['house']['address']['formatted_address'];
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
  };

  renderListElementHeader(quote) {
    return (
      <React.Fragment>
        <div>{`Quote #${quote['id']}`}</div>
      </React.Fragment>
    );
  }

  renderListElementContent(quote) {
    const customerGID = this.context;

    return (
      <React.Fragment>
        <DataRow title="Status" value={quote['status_display']} />
        <DataRow title="Total Price" value={formatPrice(quote['total_price'])} />
        <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
        {quote['approved_at'] && <DataRow title="Approved At" value={formatDateAndTime(quote['approved_at'])} />}
        {quote['cancelled_at'] && <DataRow title="Cancelled At" value={formatDateAndTime(quote['cancelled_at'])} />}
        <Link to={getQuoteDetailURL(customerGID, quote['order_id'], quote['id'])}>
          <Button
            size="large"
            type="submit">
              View Full Quote
          </Button>
        </Link>
      </React.Fragment>
    );
  }

  renderHeader() {
    const customerGID = this.context;
    const order = this.getOrder();

    return (
      <Link className="order-title" to={`/app/${customerGID}/orders`}>
        <div><ReactSVG  src={contactIcon} /></div>
        <div>{order ? `${order['product']['name']}`: null}</div>
      </Link>
    );
  }

  renderContent() {
    const {selectedOption} = this.state;
    const order = this.getOrder();
    return order && (
      <React.Fragment>
        <div className="order-details">
          <DataRow title="Order" value={`#${order['id']}`} />
          <DataRow title="Status" value={order['status_display']} />
          <DataRow title="Ordered on" value={formatDate(order['ordered_at'])} />
          <DataRow title="Address" value={this.getAddress(order)} />
        </div>
        <div className="quote-filters">
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            isMulti={false}
            isSearchable={false}
            name="quote_filter"
            onChange={this.handleChange}
            options={QUOTE_FILTERS}
            value={selectedOption} />
        </div>
        {filterQuotesSentToCustomer(order['quotes'], selectedOption).map(quote => (
          <AppSubCard
            key={`quote-${quote.id}`}
            renderContent={this.renderListElementContent.bind(this, quote)}
            renderHeader={this.renderListElementHeader.bind(this, quote)} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <AppPage
        className="order-detail-page"
        error={this.props.error}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={this.renderHeader.bind(this)} />
    );
  }

}
