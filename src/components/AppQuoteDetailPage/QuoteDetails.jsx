import React from 'react';
import PropTypes from 'prop-types';
import QuoteDescription from './QuoteDescription';
import {Notification, Spinner, ImageCard} from '@ergeon/core-components';
import {googleIntegration} from '@ergeon/core-components';
import DrawMap from '@ergeon/draw-map';
import classNames from 'classnames';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import QuoteLines from './QuoteLines';
import {CARD_TRANSACTION_FEE} from 'website/constants';
import {formatPrice, isQuoteCancelled, isQuoteExpired} from 'utils/app-order';
import {Link} from 'react-router-dom';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';
import {formatDate} from '../../utils/date';
import isEmpty from 'lodash/isEmpty';

import {ProjectImagesLegend} from './QuoteLine/utils';

export default class QuoteDetails extends React.Component {
  static propTypes = {
    asPDF: PropTypes.bool,
    auth: PropTypes.object,
    customerGID: PropTypes.string,
    getNewQuoteLink: PropTypes.func,
    isInstallerPreview: PropTypes.bool,
    quote: PropTypes.object,
    totalPrice: PropTypes.string,
  };

  state = {
    isLoadingMap: true,
  };

  isQuoteReplaced(quote = {}) {
    return quote['replaced_by_quote'] && quote['replaced_by_quote']['secret'];
  }

  renderProjectImages() {
    const {asPDF, quote} = this.props;

    const imagesArray = quote && quote['mediafile_list'] &&
      quote['mediafile_list'].mediafiles;

    if (isUpcomingFeaturesEnabled() && asPDF && !isEmpty(imagesArray)) {
      return (
        <div className="quote-line-images spacing after__is-24">
          <div className="spacing after__is-12">
            <ProjectImagesLegend/>
          </div>
          <div className="cards two-columns">
            {imagesArray.map((elem) =>
              <ImageCard key={elem.id} title={elem.title} url={elem.file} />)}
          </div>
        </div>
      );
    }
    return null;
  }

  renderQuoteCancelledMessage(quote) {
    const {getNewQuoteLink} = this.props;
    if (this.isQuoteReplaced(quote)) {
      return (
        <Notification
          mode="embed"
          type="Information">
          This quote has been revised. Click
          <Link
            className="link"
            rel="noopener"
            target={'_blank'}
            to={getNewQuoteLink()}>
            &nbsp;here
          </Link> to display the new revision.
        </Notification>
      );
    }

    return (
      <div className="spacing after__is-24">
        <Notification
          mode="embed"
          type="Warning">
          This quote has been cancelled.
        </Notification>
      </div>
    );
  }
  renderQuoteExpiredMessage() {
    return (
      <Notification
        mode="embed"
        type="Error">
        This quote is expired.
        Call <a href={`tel:${PHONE_NUMBER}`}>{formatPhoneNumber(PHONE_NUMBER)}</a> to request a new quote revision.
      </Notification>
    );
  }
  render() {
    const {quote, asPDF, auth, isInstallerPreview, totalPrice, customerGID} = this.props;
    const {isLoadingMap} = this.state;
    const {
      'parent_quote': parentQuote,
      'calc_input': calcInput,
    } = quote;
    let parentQuoteTotalPrice = 0;
    let parentQuoteTotalPriceText = null;

    if (parentQuote) {
      parentQuoteTotalPrice = isInstallerPreview ? parentQuote['total_cost'] : parentQuote['total_price'];
      parentQuoteTotalPriceText = `
        Total previously approved
        (${formatDate(parentQuote['approved_at'])}):
        ${formatPrice(parentQuoteTotalPrice)}
      `;
    }

    let address = quote.order.house.address;
    if (!address) {
      address = quote.order.house.customer['main_address'];
    }
    let gates = [], sides = [], polygons = [];
    if (calcInput) {
      gates = calcInput.gates || [];
      sides = calcInput.sides || [];
      polygons = calcInput.polygons || [];
    }
    const SPINNER_BORDER_WITH = 0.10;
    const SPINNER_SIZE = 64;
    const location = {
      lat: address.latitude,
      lng: address.longitude,
    };
    return (
      <div className="quote-details card padding-40 soft-border spacing after__is-48">
        {!asPDF && isQuoteCancelled(quote) && (
          <div className="quote-details__notification">
            {this.renderQuoteCancelledMessage(quote)}
          </div>
        )}
        {!asPDF && isQuoteExpired(quote) && (
          <div className="quote-details__notification">
            {this.renderQuoteExpiredMessage()}
          </div>
        )}
        <div className="quote-details__description flex-wrapper spacing after__is-24">
          <QuoteDescription asPDF={asPDF} auth={auth} customerGID={customerGID} quote={quote} />
          <div className="quote-labels-map">
            <Spinner
              active={isLoadingMap}
              borderWidth={SPINNER_BORDER_WITH}
              color="green"
              size={SPINNER_SIZE} />
            <DrawMap
              className={classNames({'quote-labels-map__content': isLoadingMap})}
              disabled
              disableMapUI={asPDF}
              googleLoader={googleIntegration.getGoogleLoader()}
              location={location}
              onTilesLoaded={() => {
                this.setState({isLoadingMap: false});
              }}
              restoreFrom={{gates, sides, polygons}}
              showControls={false} />
          </div>
        </div>
        {!asPDF && isQuoteExpired(quote) && (
          <Notification mode="embed" type="Information">
            Oops, it looks like your quote has expired.
            Lumber and Labor prices can fluctuate depending on a number of
            factors throughout the year, therefore our quotes are only good
            for 30 days.  Your quote may not change, but we would like to
            update it for you. You clicking approve has alerted us and we
            are already in the process of updating your quote and someone
            will be in touch you shortly.  If you would rather not wait,
            simply contact us at <a href={`tel:${PHONE_NUMBER}`}>{formatPhoneNumber(PHONE_NUMBER)}</a>.
          </Notification>
        )}
        {this.renderProjectImages()}
        <QuoteLines
          asPDF={asPDF}
          isInstallerPreview={isInstallerPreview}
          quote={quote} />
        <div className={classNames({'total-price': !isInstallerPreview, 'total-price-noteless': isInstallerPreview})}>
          <h4>Total: {totalPrice}</h4>
          {parentQuote && (
            <b className="quote-line-approved-at-label">
              {parentQuoteTotalPriceText}
            </b>
          )}
        </div>
        {!isInstallerPreview && (
          <div className="asterisk-notes">
            <span className="asterisk">*</span>
            <i> – An additional {CARD_TRANSACTION_FEE} fee will be added for credit/debit cards</i>
          </div>)}
      </div>);
  }
}
