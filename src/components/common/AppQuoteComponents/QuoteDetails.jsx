import React from 'react';

import PropTypes from 'prop-types';
import {Notification, Spinner, ImageCard, Title, googleIntegration, utils} from '@ergeon/core-components';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import DrawMap from '@ergeon/draw-map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import iconPhotoPlaceholder from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';

import {isQuoteApproved, isQuoteCancelled, isQuoteExpired} from 'utils/app-order';
import {CARD_TRANSACTION_FEE} from 'website/constants';

import QuoteLines from './QuoteLines';
import QuoteDescription from './QuoteDescription';

export default class QuoteDetails extends React.Component {
  static propTypes = {
    approvedAt: PropTypes.string,
    asPDF: PropTypes.bool,
    auth: PropTypes.object,
    customer: PropTypes.object,
    customerGID: PropTypes.string,
    customerPDF: PropTypes.string,
    isInstallerPreview: PropTypes.bool,
    isMultiPartyQuote: PropTypes.bool,
    isPrimaryQuoteApproval: PropTypes.bool,
    newQuoteLink: PropTypes.string,
    lastApprovedProjectRevisionQuoteApprovalLink: PropTypes.string,
    onBuildDetailsClick: PropTypes.func,
    quote: PropTypes.object,
    quoteLines: PropTypes.arrayOf(PropTypes.object),
    totalPreviouslyApprovedPrice: PropTypes.string,
    totalPrice: PropTypes.string,
    totalProjectPrice: PropTypes.string,
  };

  state = {
    isLoadingMap: true,
  };

  isQuoteReplaced() {
    return this.props.quote['replaced_by_quote'] && this.props.quote['replaced_by_quote']['secret'];
  }

  renderProjectImages() {
    const {asPDF, quote} = this.props;

    const imagesArray = quote && quote['mediafile_list'] && quote['mediafile_list'].mediafiles;

    if (asPDF && !isEmpty(imagesArray)) {
      return (
        <div className="quote-line-images spacing before__is-24 after__is-24">
          <Title className="spacing after__is-12" icon={iconPhotoPlaceholder}>
            Project Images
          </Title>
          <div className="cards two-columns">
            {imagesArray.map((elem, idx) => (
              <ImageCard key={`${elem.id}_${idx}`} title={elem.title} url={elem.file} />
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  renderQuoteCancelledMessage() {
    const {newQuoteLink} = this.props;

    if (this.isQuoteReplaced() && newQuoteLink) {
      return (
        <Notification mode="embed" type="Information">
          This quote has been revised. Click
          <Link className="link" rel="noopener" target={'_blank'} to={newQuoteLink}>
            &nbsp;here
          </Link>{' '}
          to display the new revision.
        </Notification>
      );
    }

    return (
      <div className="spacing after__is-24">
        <Notification mode="embed" type="Warning">
          This quote has been cancelled.
        </Notification>
      </div>
    );
  }

  renderQuoteExpiredMessage() {
    return (
      <Notification mode="embed" type="Error">
        This quote is expired. Call <a data-track-call="true" href={`tel:${PHONE_NUMBER}`}>
          {utils.formatPhoneNumber(PHONE_NUMBER)}
        </a> to request a new quote revision.
      </Notification>
    );
  }

  renderLastApprovedProjectRevisionQuoteApprovalExistsMessage() {
    const {lastApprovedProjectRevisionQuoteApprovalLink} = this.props;

    return (
      <Notification mode="embed" type="Warning">
        This quote has an approved project revision. Click
        <Link className="link" rel="noopener" target={'_blank'} to={lastApprovedProjectRevisionQuoteApprovalLink}>
          &nbsp;here
        </Link>{' '}
        to display the new revision.
      </Notification>
    );
  }

  renderQuoteLinesOnMap() {
    const {quote, asPDF} = this.props;
    const {isLoadingMap} = this.state;
    let calcInput = quote['calc_input'];
    if (quote['project_calc_input']) {
      calcInput = quote['project_calc_input'];
    }
    let address = quote.order.house.address;
    if (!address) {
      address = quote.order.house.customer['main_address'];
    }
    let gates = [],
      sides = [],
      polygons = [];
    if (calcInput) {
      gates = calcInput.gates || [];
      sides = calcInput.sides || [];
      polygons = calcInput.polygons || [];
    }
    const SPINNER_BORDER_WITH = 0.1;
    const SPINNER_SIZE = 64;
    const location = {
      lat: address.latitude,
      lng: address.longitude,
    };

    return (
      <div className="quote-labels-map">
        <Spinner active={isLoadingMap} borderWidth={SPINNER_BORDER_WITH} color="blue" size={SPINNER_SIZE} />
        <DrawMap
          className={classNames({'quote-labels-map__content': isLoadingMap})}
          disableMapUI={asPDF}
          disabled
          googleLoader={googleIntegration.getGoogleLoader()}
          location={location}
          onTilesLoaded={() => {
            this.setState({isLoadingMap: false});
          }}
          restoreFrom={{gates, sides, polygons}}
          showControls={false}
        />
      </div>
    );
  }

  renderQuotePriceSection() {
    const {quote, isInstallerPreview, totalPrice, totalPreviouslyApprovedPrice, totalProjectPrice} = this.props;
    const {is_scope_change: isScopeChange} = quote;

    if (!isScopeChange) {
      return (
        <div className={classNames({'total-price': !isInstallerPreview, 'total-price-noteless': isInstallerPreview})}>
          <h4>Total: {totalPrice}</h4>
        </div>
      );
    }

    return (
      <div className={classNames({'total-price': !isInstallerPreview, 'total-price-noteless': isInstallerPreview})}>
        <h6 className="change-order-quote-price">Total change order price for approval: {totalPrice}</h6>
        <h6 className="change-order-total-previous-price">
          Total previously approved: {totalPreviouslyApprovedPrice}
        </h6>
        <h4 className="change-order-total-project-price">Total project price: {totalProjectPrice}</h4>
      </div>
    );
  }

  render() {
    const {
      approvedAt,
      asPDF,
      auth,
      customer,
      customerGID,
      customerPDF,
      isInstallerPreview,
      isMultiPartyQuote,
      isPrimaryQuoteApproval,
      lastApprovedProjectRevisionQuoteApprovalLink,
      onBuildDetailsClick,
      quote,
      quoteLines,
    } = this.props;

    const showExpiredNotice = (
      !asPDF &&
      !isQuoteApproved(quote) &&
      isQuoteExpired(quote)
    );

    return (
      <div className="quote-details card soft-border spacing after__is-48">
        {!asPDF && lastApprovedProjectRevisionQuoteApprovalLink && (
          <div className="quote-details__notification">
            {this.renderLastApprovedProjectRevisionQuoteApprovalExistsMessage()}
          </div>
        )}
        {!asPDF && isQuoteCancelled(quote) && (
          <div className="quote-details__notification">{this.renderQuoteCancelledMessage()}</div>
        )}
        {showExpiredNotice && (
          <div className="quote-details__notification">{this.renderQuoteExpiredMessage()}</div>
        )}
        <div className="quote-details__description spacing after__is-24">
          <QuoteDescription
            approvedAt={approvedAt}
            asPDF={asPDF}
            auth={auth}
            customer={customer}
            customerGID={customerGID}
            customerPDF={customerPDF}
            quote={quote}
          />
          {this.renderQuoteLinesOnMap()}
        </div>
        {showExpiredNotice && (
          <Notification mode="embed" type="Information">
            Oops, it looks like your quote has expired. Lumber and Labor prices can fluctuate depending on a number of
            factors throughout the year, therefore our quotes are only good for 15 days. Your quote may not change, but
            we would like to update it for you. You clicking approve has alerted us and we are already in the process of
            updating your quote and someone will be in touch you shortly. If you would rather not wait, simply contact
            us at <a data-track-call="true" href={`tel:${PHONE_NUMBER}`}>{utils.formatPhoneNumber(PHONE_NUMBER)}</a>.
          </Notification>
        )}
        {this.renderProjectImages()}
        <QuoteLines
          asPDF={asPDF}
          isInstallerPreview={isInstallerPreview}
          isMultiPartyQuote={isMultiPartyQuote}
          isPrimaryQuoteApproval={isPrimaryQuoteApproval}
          onBuildDetailsClick={onBuildDetailsClick}
          quote={quote}
          quoteLines={quoteLines}
        />
        {this.renderQuotePriceSection()}
        {!isInstallerPreview && (
          <div className="asterisk-notes">
            <span className="asterisk">*</span>
            <i> ??? An additional {CARD_TRANSACTION_FEE} fee will be added for credit/debit cards</i>
          </div>
        )}
        {asPDF &&
          <div className="print-copyright">
            <p className="print-copyright__text">&copy; {new Date().getFullYear()} Ergeon Inc.</p>
          </div>
        }
      </div>
    );
  }
}
