import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {
  ImageGallery,
  SwipeGallery,
  Button,
  DataRow,
  Title,
  Collapsible,
  Tooltip,
  Notification,
  DropdownButton,
} from '@ergeon/core-components';
import {isPDFMode} from 'utils/utils';
import isEmpty from 'lodash/isEmpty';

import ImgBack from 'assets/icon-arrow-left.svg';
import iconPhotoPlaceholder from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import iconSave from '@ergeon/core-components/src/assets/icon-save.svg';
import iconInfo from '@ergeon/core-components/src/assets/icon-info.svg';
import iconEmail from '@ergeon/core-components/src/assets/icon-email.svg';

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
    customerPDF: PropTypes.string,
    maxThumbnails: PropTypes.number,
    maxThumbnailSize: PropTypes.number,
    quote: PropTypes.object,
  };

  static defaultProps = {
    maxThumbnails: 4,
    maxThumbnailSize: 150,
  }

  state = {
    customerDetailsOpen: false,
    quoteDetailsOpen: false,
    displayLicenseNotification: false,
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
    const {maxThumbnails, maxThumbnailSize} = this.props;
    const imagesArray = this.getMediafileList();

    if (imagesArray && !isEmpty(imagesArray) && !isPDFMode()) {
      return (
        <div className="quote-fields-wrapper__images desktop-length">
          <div className="quote-project-images">
            <div className="desktop-length">
              <Title className="ImageGallery-container link" icon={iconPhotoPlaceholder}>
                <p className="link">
                  Project Images ({imagesArray.length})
                </p>
              </Title>
              <ImageGallery
                height={maxThumbnailSize}
                images={imagesArray}
                thumbnailNumDisplay={maxThumbnails}
                width={maxThumbnailSize} />
            </div>
          </div>
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

  onStaffDropdownItemClick(link) {
    window.open(link, '_self');
  }

  staffDropdownItems(staff) {
    const items = [];
    if (staff.email) {
      items.push({
        label: staff.email,
        icon: iconEmail,
        onClick: () => {
          this.onStaffDropdownItemClick(`mailto:${staff.email}`);
        },
      });
    }
    return items;
  }

  renderBackButton() {
    return (
      <Link
        className="button button--regular button--size__small taste__boundless button-back"
        to={this.linkToOrderPage}>
        <ReactSVG className="gray-arrow-fill" src={ImgBack} />Back to order</Link>
    );
  }

  renderLicenseMessage(license) {
    return (
      <>
        Ergeon’s license is issued by the Contractors State License Board.
        {license.public_help_page_url &&
          <a href={license.public_help_page_url} rel="noreferrer" target="_blank">View details</a>
        }
      </>
    );
  }

  renderLicenses() {
    const {quote} = this.props;

    const licenses = quote.licenses.map((license, i) => {
      // validation_url is not nullable, so we need to check if it is empty
      const isValidationUrlEmpty = license.validation_url === '';
      return (
        <div className="quote-license" key={`license-${i}`}>
          <div>
            {license['quote_string']} &nbsp;
            <div className="quote-license-number">
              {!isValidationUrlEmpty &&
                <a href={license.validation_url} rel="noreferrer" target="_blank">#{license.number}</a>
              }
              {license.public_help_page_url &&
                <>
                  <ReactSVG
                    className="quote-license-icon mobile-length"
                    onClick={() => this.setState({displayLicenseNotification: true})}
                    src={iconInfo} />
                  <Tooltip
                    msg={this.renderLicenseMessage(license)}
                    position="right">
                    <ReactSVG className="quote-license-icon desktop-length" src={iconInfo} />
                  </Tooltip>
                </>
              }
            </div>
          </div>
          {this.state.displayLicenseNotification &&
            <Notification
              mode="floating"
              onClose={() => this.setState({displayLicenseNotification: false})}
              type="Information">
              {this.renderLicenseMessage(license)}
            </Notification>
          }
        </div>
      );
    });

    return (
      <DataRow title="Licenses" value={licenses} />
    );
  }

  renderTitle() {
    const {customerPDF} = this.props;
    const {id, title, order} = this.props.quote;
    return (
      <div className="quote-details__title">
        <div>
          <h4>
            Quote #{id}
            <span className="quote-details-title">
              {title ?
                title :
                order.product.name
              }
            </span>
          </h4>
        </div>
        <div>
          {customerPDF && !isPDFMode() &&
            <Button
              asAnchor
              className="quote-save-button"
              flavor="regular"
              href={customerPDF}
              target="_blank">
              <img alt="Save as PDF" src={iconSave} />
              Save as PDF
            </Button>
          }
        </div>
      </div>
    );
  }

  renderQuoteDetails() {
    const {approvedAt, quote} = this.props;
    const expiresAt = quote['expires_at'];
    const expiresAtTitle = getExpiresAtTitle(expiresAt);
    const house = quote.order.house;
    let {address} = house;
    if (!address) {
      address = house.customer['main_address'];
    }
    return (
      <>
        <div className="quote-fields-wrapper__fields">
          <DataRow title="Order Address" value={address.formatted_address} />
          {this.renderLicenses()}
          {
            this.isUserOwnerOfQuote()
              ? <DataRow title="Order ID" value={<Link to={this.linkToOrderPage}>#{quote.order.id}</Link>} />
              : <DataRow title="Order ID" value={`#${quote.order.id}`} />
          }
          <DataRow title="Sent At" value={formatDateAndTime(quote['sent_to_customer_at'])} />
          {expiresAt && <DataRow title={expiresAtTitle} value={formatDateAndTime(expiresAt)} />}
          {approvedAt && <DataRow title="Approved At" value={formatDateAndTime(approvedAt)} />}
        </div>
        <div className="quote-fields-wrapper__staff-contacts">
          {quote.order.sales_rep &&
            <DataRow
              title="Sales Rep"
              value={<DropdownButton
                className="Appointment-DropdownButton"
                items={this.staffDropdownItems(quote.order.sales_rep)}
                label={quote.order.sales_rep.full_name} />} />
          }
          {quote.order.project_manager &&
            <DataRow
              title="Project Manager"
              value={<DropdownButton
                className="Appointment-DropdownButton"
                items={this.staffDropdownItems(quote.order.project_manager)}
                label={quote.order.project_manager.full_name} />} />
          }
        </div>
      </>
    );
  }

  render() {
    const {quote, asPDF} = this.props;

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
          {this.renderTitle()}
          <div className="quote-fields">
            <div className="desktop-length">
              <div className="quote-fields-wrapper">
                {this.renderQuoteDetails()}
                {this.imagesGalleryDesktop()}
              </div>
            </div>
            <div className="mobile-length">
              <Collapsible
                isOpen={this.state.quoteDetailsOpen}
                onChangeOpen={() => this.setState({quoteDetailsOpen: !this.state.quoteDetailsOpen})}
                title="Quote details">
                {this.renderQuoteDetails()}
              </Collapsible>
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
