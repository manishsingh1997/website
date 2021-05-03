import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import {Link} from 'react-router-dom';
import {ImageGallery, SwipeGallery} from '@ergeon/core-components';
import {isPDFMode} from 'utils/utils';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';
import isEmpty from 'lodash/isEmpty';

import ImgBack from '../../assets/icon-arrow-left.svg';
import iconPhotoPlaceholder from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';

import {ERGEON_LICENSE_NUMBER} from '../../website/constants';
import DataRow from '../common/DataRow';
import {formatDateAndTime} from '../../utils/date';
import {getExpiresAtTitle} from '../../utils/utils';
import {getOrderDetailURL} from '../../utils/urls';
import {isQuoteApproved} from 'utils/app-order';

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
  isUserOwnerOfQuote() {
    const {auth: {user}, customerGID} = this.props;
    return !!user && user.gid === customerGID;
  }
  getMediafileList() {
    const {quote} = this.props;
    // check if we have mediafiles, if so map url to elem.file as our Galleries need it
    return quote && quote['mediafile_list'] &&
      quote['mediafile_list'].mediafiles.map((elem) => ({url: elem.file, ...elem}));
  }
  imagesGalleryDesktop() {
    const imagesArray = this.getMediafileList();

    if (isUpcomingFeaturesEnabled() && !isEmpty(imagesArray)) {
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

    if (isUpcomingFeaturesEnabled() && !isEmpty(imagesArray)) {
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
    const {quote, asPDF} = this.props;
    const house = quote.order.house;
    const {customer} = house;
    let {address} = house;

    const expiresAt = quote['expires_at'];
    const expiresAtTitle = getExpiresAtTitle(expiresAt);
    const approvedAt = quote['approved_at'];
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
          {quote.title && quote.title.length < 55 ? <h3>{quote.title}</h3> : <h4>{quote.title}</h4>}
          {!quote.title && <h3>{quote.order.product.name} Quote #{quote.id}</h3>}
          <div>
            <i>Quote provided by Ergeon, license CA{ERGEON_LICENSE_NUMBER}</i>
          </div>
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
                {isQuoteApproved(quote) && approvedAt && (
                  <DataRow title="Approved At" value={formatDateAndTime(approvedAt)} />
                )}
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
