import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import {Link} from 'react-router-dom';

import ImgBack from '../../assets/icon-arrow-left.svg';

import {ERGEON_LICENSE_NUMBER} from '../../website/constants';
import DataRow from '../common/DataRow';
import {formatDateAndTime} from '../../utils/date';
import {getExpiresAtTitle} from '../../utils/utils';
import {getOrderDetailURL} from '../../utils/urls';

export default class QuoteDescription extends React.Component {
  static propTypes = {
    asPDF: PropTypes.bool,
    auth: PropTypes.object,
    customerGID: PropTypes.string,
    quote: PropTypes.object,
  };
  get linkToOrderPage() {
    const {customerGID} = this.props;
    const orderID = this.props.quote['order_id'];
    return getOrderDetailURL(customerGID, orderID);
  }
  isUserSignedIn() {
    const {auth : {user}} = this.props;
    return !!user;
  }
  renderBackButton() {
    return (
      <Link
        className="button button--regular button--size__small taste__boundless button-back"
        to={this.linkToOrderPage}>
        <ReactSVG className="gray-arrow-fill" src={ImgBack}/>Back to order</Link>
    );
  }
  render() {
    const {quote, asPDF} = this.props;
    const {
      order: {house: {address, customer}},
    } = quote;
    const expiresAt = quote['expires_at'];
    const expiresAtTitle = getExpiresAtTitle(expiresAt);
    const customerDetails = (
      <div>
        {customer.full_name}<br />
        {address.formatted_address}<br />
        {customer.email}<br />
        {customer.phone_number}<br />
      </div>
    );
    return (
      <div className="quote-details-wrapper">
        {this.isUserSignedIn() && !asPDF && this.renderBackButton()}
        <h3>{quote.order.product.name} Quote #{quote.id}</h3>
        <div>
          <i>Quote provided by Ergeon, licence {ERGEON_LICENSE_NUMBER}</i>
        </div>
        <div className="quote-fields spacing before__is-24">
          <DataRow title="Customer" value={customerDetails} />
          <DataRow title="Quote ID" value={`#${quote.id}`} />
          {
            this.isUserSignedIn()
              ? <DataRow title="Order ID" value={<Link to={this.linkToOrderPage}>#{quote.order.id}</Link>}/>
              : <DataRow title="Order ID" value={`#${quote.order.id}`} />
          }
          <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
          {expiresAt && <DataRow title={expiresAtTitle} value={formatDateAndTime(expiresAt)} />}
        </div>
      </div>);
  }
}
