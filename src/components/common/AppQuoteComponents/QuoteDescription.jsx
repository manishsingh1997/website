import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {ImageGallery, SwipeGallery} from '@ergeon/core-components';
import {isPDFMode} from 'utils/utils';
import isEmpty from 'lodash/isEmpty';

import ImgBack from 'assets/icon-arrow-left.svg';
import iconPhotoPlaceholder from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';

import DataRow from 'components/common/DataRow';
import {formatDateAndTime} from 'utils/date';
import {getExpiresAtTitle} from 'utils/utils';
import {getOrderDetailURL} from 'utils/urls';

export default class QuoteDescription extends React.Component {
  static propTypes = {
    approvedAt: PropTypes.string,
    asPDF: PropTypes.bool,
    auth: PropTypes.object,
    customer: PropTypes.object,
    customerGID: PropTypes.string,
    quote: PropTypes.object,
  };

  get linkToOrderPage() {
    const {quote: {order_id: orderID, order: {house: {customer}}}} = this.props;
    return getOrderDetailURL(customer.gid, orderID);
  }

  isUserOwnerOfQuote() {
    const {auth: {user}, quote: {order: {house: customer}}} = this.props;
    return !!user && user.gid === customer.gid;
  }

  getMediafileList() {
    const {quote} = this.props;
    // check if we have mediafiles, if so map url to elem.file as our Galleries need it
    return quote && quote['mediafile_list'] &&
      quote['mediafile_list'].mediafiles.map((elem) => ({url: elem.file, ...elem}));
  }

  imagesGalleryDesktop() {
    const imagesArray = this.getMediafileList();

    if (!isEmpty(imagesArray)) {
      return (
        <div className="quote-project-images">
          {imagesArray && !isPDFMode() &&
            <div className="desktop-length">
              <ImageGallery
                height={150}
                images={imagesArray}
                title="Project Images"
                titleIcon={iconPhotoPlaceholder}
                width={150} />
            </div>
          }
        </div>
      );
    }
    return null;
  }

  imagesGalleryMobile() {
    const imagesArray = this.getMediafileList();

    if (!isEmpty(imagesArray)) {
      return (
        <div className="quote-project-images">
          {imagesArray && !isPDFMode() &&
            <div className="mobile-length">
              <SwipeGallery images={imagesArray} title="Project Images" titleIcon={iconPhotoPlaceholder} />
            </div>
          }
        </div>
      );
    }
    return null;
  }

  renderBackButton() {
    return (
      <Link
        className="button button--regular button--size__small taste__boundless button-back"
        to={this.linkToOrderPage}>
        <ReactSVG className="gray-arrow-fill" src={ImgBack} />Back to order</Link>
    );
  }

  render() {
    const {approvedAt, customer, quote, asPDF} = this.props;
    const house = quote.order.house;
    let {address} = house;

    const expiresAt = quote['expires_at'];
    const expiresAtTitle = getExpiresAtTitle(expiresAt);
    if (!address) {
      address = house.customer['main_address'];
    }

    const customerDetails = (
      <div>
        {customer.full_name}<br />
        {address.formatted_address}<br />
        {customer.email}<br />
        {customer.phone_number}<br />
      </div>
    );
    return (
      <>
        <div className="quote-details-wrapper">
          {this.isUserOwnerOfQuote() && !asPDF && this.renderBackButton()}
          <Helmet>
            {quote.title && <title key={Math.random()}>{quote.title}</title>}
            {!quote.title &&
              <title key={Math.random()}>
                {`${quote.order.product.name} Quote #${quote.id}`}
              </title>
            }
          </Helmet>
          {quote.title && quote.title.length < 55 ? <h3>{quote.title}</h3> : <h4>{quote.title}</h4>}
          {!quote.title && <h3>{quote.order.product.name} Quote #{quote.id}</h3>}
          {quote.order.house.address.licence && <div>
            <i>Quote provided by Ergeon, license {quote.order.house.address.licence}</i>
          </div>
          }
          <div className="quote-fields spacing before__is-24">
            <DataRow title="Customer" value={customerDetails} />
            <div className="quote-fields-wrapper">
              <div className="quote-fields-wrapper__fields">
                <DataRow title="Quote ID" value={`#${quote.id}`} />
                {
                  this.isUserOwnerOfQuote()
                    ? <DataRow title="Order ID" value={<Link to={this.linkToOrderPage}>#{quote.order.id}</Link>} />
                    : <DataRow title="Order ID" value={`#${quote.order.id}`} />
                }
                <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
                {expiresAt && <DataRow title={expiresAtTitle} value={formatDateAndTime(expiresAt)} />}
                {approvedAt && <DataRow title="Approved At" value={formatDateAndTime(approvedAt)} />}
              </div>
              <div className="quote-fields-wrapper__images desktop-length">
                {this.imagesGalleryDesktop()}
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-length">
          {this.imagesGalleryMobile()}
        </div>
      </>
    );
  }
}
