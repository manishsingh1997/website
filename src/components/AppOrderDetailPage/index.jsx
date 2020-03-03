import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {Button, SelectFilter} from '@ergeon/core-components';
import contactIcon from '@ergeon/core-components/src/assets/icon-arrow-left.svg';

import {formatDate, formatDateAndTime} from 'utils/date';
import {
  filterQuotesByStatus,
  filterQuotesSentToCustomer,
  formatPrice,
  QUOTE_FILTERS,
} from 'utils/app-order';
import {getQuoteDetailURL} from 'utils/urls';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import {DRIVEWAY_QUANTITY_UNIT, FENCE_QUANTITY_UNIT} from 'website/constants';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';
import AppConfigPreview from 'components/common/AppConfigPreview';

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
    const {getOrders} = this.props;
    const customerGID = this.context;
    getOrders(customerGID);
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

    const schemaCodeUrl = quote['preview_quote_line'] && quote['preview_quote_line']['config']['schema_code_url'];

    const showTotalLength = Boolean(quote['total_length']) && quote['total_length'] !== '0';
    const showTotalArea = Boolean(quote['total_area']) && quote['total_area'] !== '0';

    return (
      <React.Fragment>
        <div className="flex-wrapper">
          <div>
            <DataRow title="Status" value={quote['status_display']} />
            <DataRow title="Total Price" value={formatPrice(quote['total_price'])} />
            {showTotalLength &&
            <DataRow title="Total length" value={`${quote['total_length']} ${FENCE_QUANTITY_UNIT}`} />}
            {showTotalArea &&
            <DataRow title="Total area" value={`${quote['total_area']} ${DRIVEWAY_QUANTITY_UNIT}`} />}
            <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
            {quote['approved_at'] && <DataRow title="Approved At" value={formatDateAndTime(quote['approved_at'])} />}
            {quote['cancelled_at'] && <DataRow title="Cancelled At" value={formatDateAndTime(quote['cancelled_at'])} />}
          </div>
          <div>
            <AppConfigPreview className="quote-preview" schemaCodeUrl={schemaCodeUrl} />
          </div>
        </div>
        <div>
          <Link className="spacing left__is-10" to={getQuoteDetailURL(customerGID, quote['secret'])}>
            <Button
              size="large"
              type="submit">
                View Full Quote
            </Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }

  renderHeader() {
    const {selectedOption} = this.state;
    const customerGID = this.context;
    const order = this.getOrder();

    return (
      <React.Fragment>
        <Link className="order-title" to={`/app/${customerGID}/orders`}>
          <div><ReactSVG  src={contactIcon} /></div>
          <div>{order ? `${order['product']['name']}`: null}</div>
        </Link>
        {order && filterQuotesSentToCustomer(order['quotes']).length !== 0 &&
          <div className="quote-filters">
            <SelectFilter
              className="react-select-filter-container"
              classNamePrefix="react-select-filter"
              name="quote_filter"
              onChange={this.handleChange}
              options={QUOTE_FILTERS}
              value={selectedOption} />
          </div>}
      </React.Fragment>
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
        {filterQuotesByStatus(order['quotes'], selectedOption).map(quote => (
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
