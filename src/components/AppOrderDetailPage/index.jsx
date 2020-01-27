import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import Select from 'react-select';

import {Button, Spinner} from '@ergeon/core-components';
import contactIcon from '@ergeon/core-components/src/assets/icon-arrow-left.svg';
import {calcUtils} from '@ergeon/3d-lib';

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
    previewImages: {},
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

  fetchQuotePreview(quote) {
    const data = calcUtils.getValueFromUrl(`/?${quote['preview_quote_line']['config']['schema_code_url']}`);
    calcUtils.getPreviewImage(data).then(
      preview => {
        this.setState(prevState => (
          {previewImages: {...prevState.previewImages, [quote['id']]: preview}})
        );
      }
    ).catch(error => {
      // save `null` in case of error, so preview image will not be shown at all
      this.setState(prevState => (
        {previewImages: {...prevState.previewImages, [quote['id']]: null}})
      );
      throw error;  // re-raise an error so we'll be notified
    });
  }

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
    const previewImage = schemaCodeUrl ? this.state.previewImages[quote['id']]: null;
    let quotePreviewComponent = null;

    if (previewImage === undefined) {
      this.fetchQuotePreview(quote);
      quotePreviewComponent = <Spinner active={true} borderWidth={.15} color="green" size={64} />;
    } else if (previewImage) {
      quotePreviewComponent = <img src={previewImage} />;
    }

    return (
      <React.Fragment>
        <div className="flex-wrapper">
          <div>
            <DataRow title="Status" value={quote['status_display']} />
            <DataRow title="Total Price" value={formatPrice(quote['total_price'])} />
            <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
            {quote['approved_at'] && <DataRow title="Approved At" value={formatDateAndTime(quote['approved_at'])} />}
            {quote['cancelled_at'] && <DataRow title="Cancelled At" value={formatDateAndTime(quote['cancelled_at'])} />}
          </div>
          <div>
            {previewImage !== null && (
              <div className="quote-line-preview border">
                {quotePreviewComponent}
              </div>
            )}
          </div>
        </div>
        <div>
          <Link className="spacing left__is-10" to={getQuoteDetailURL(customerGID, quote['order_id'], quote['id'])}>
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
