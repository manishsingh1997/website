import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {Spinner} from '@ergeon/core-components';

import DrawMap, {getLabelFromIndex} from '@ergeon/draw-map';

import {formatDate, isPastDate} from 'utils/date';
import {formatPrice} from 'utils/app-order';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import AppConfigPreview from 'components/common/AppConfigPreview';
import DataRow from 'components/common/DataRow';

import {getQuoteDetails} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import {ERGEON_LICENSE_NUMBER} from 'website/constants';
import MapLabel from './MapLabel';
import Notice from './Notice';

import '@ergeon/draw-map/styles.css';

import './index.scss';

const STATUS_CANCELLED = 'CAN';

export default class AppQuoteDetailPage extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        secret: PropTypes.string,
      }),
    }),
  };

  state = {
    previewImages: {},
    isLoading: false,
    isLoadingMap: false,
    quote: null,
  };

  async componentDidMount() {
    await this.getQuoteDetailsFromAPI();
  }

  static contextType = CustomerGIDContext;

  async getQuoteDetailsFromAPI() {
    // We don't need this data in redux store for now, so calling API directly
    this.setState({isLoading: true, isLoadingMap: true});
    try {
      const data = await getQuoteDetails(this.context, this.props.match.params.secret);
      this.setState({quote: data.data});
    } catch (apiError) {
      // TODO: show reasonable message
      throw apiError;
    } finally {
      this.setState({isLoading: false});
    }
  }

  isQuoteCancelled(quote = {}) {
    return quote.status === STATUS_CANCELLED;
  }

  isQuoteReplaced(quote = {}) {
    return quote['replaced_by_quote'] && quote['replaced_by_quote']['secret'];
  }

  getNewQuoteLink(quote) {
    const {location, match} = this.props;
    return location.pathname.replace(match.params.secret, quote['replaced_by_quote']['secret']);
  }

  getQuoteDesigns(quote = {}) {
    let fenceDescription = {materials: [], styles: []};

    if (quote['fence_description']) {
      fenceDescription = quote['fence_description'];
    }

    const {materials, styles} = fenceDescription;
    return [...materials, ...styles];
  }

  getQuoteLineForCalcInputItem(quoteLines, itemName) {
    return quoteLines.find((quoteLine) => quoteLine.label === itemName);
  }

  getTotal(quote) {
    // TODO: internal/direct
    return quote.total_price;
  }

  renderQuotePreview(quoteLine, noPreview) {
    const schemaCodeUrl = quoteLine && quoteLine['config']['schema_code_url'];
    return (
      <AppConfigPreview
        className="quote-line-preview"
        noPreview={noPreview}
        schemaCodeUrl={schemaCodeUrl} />
    );
  }

  renderQuoteCancelledMessage(quote) {
    if (this.isQuoteReplaced(quote)) {
      return (
        <Notice>
          This quote has been revised. Click
          <Link
            className="link"
            rel="noopener"
            target={'_blank'}
            to={this.getNewQuoteLink(quote)}>
            &nbsp;here
          </Link> to display the new revision
        </Notice>
      );
    }

    return (
      <Notice>
        This quote has been cancelled.
      </Notice>
    );
  }

  render() {
    const {isLoadingMap, isLoading, quote} = this.state;

    if (isLoading) {
      return <AppLoader />;
    }
    if (!quote) {
      return null;
    }
    const {
      'calc_input': {gates, sides, polygons},
      order: {house: {address, customer}},
    } = quote;
    const location = {
      lat: address.latitude,
      lng: address.longitude,
    };

    const customerDetails = (
      <div>
        {customer.full_name}<br />
        {address.formatted_address}<br />
        {customer.email}<br />
        {customer.phone_number}<br />
      </div>
    );

    const designs = this.getQuoteDesigns(quote);
    const SPINNER_BORDER_WITH = 0.10;
    const SPINNER_SIZE = 64;

    return (
      <div className="quote-detail-page">
        <div className="quote-details card shadow soft-border">
          {this.isQuoteCancelled(quote) && this.renderQuoteCancelledMessage(quote)}
          <div className="flex-wrapper spacing after__is-48">
            <div className="quote-details-wrapper">
              <h4>{quote.order.product.name} Quote #{quote.id}</h4>
              <div className="spacing before__is-12 after__is-12">
                {quote.title}
              </div>
              <div>
                <i>Quote provided by Ergeon, licence {ERGEON_LICENSE_NUMBER}</i>
              </div>
              <div className="quote-fields spacing before__is-24">
                <DataRow title="Customer" value={customerDetails} />
                <DataRow title="Quote ID" value={`#${quote.id}`} />
                <DataRow title="Order ID" value={`#${quote.order.id}`} />
                <DataRow title="Sent On" value={formatDate(quote['sent_to_customer_at'])} />
                <DataRow title="Expires On" value={formatDate(quote['expires_at'])} />
              </div>
            </div>
            <div className="quote-labels-map">
              <Spinner
                active={isLoadingMap}
                borderWidth={SPINNER_BORDER_WITH}
                color="green"
                size={SPINNER_SIZE} />
              <DrawMap
                className={classNames({'quote-labels-map__content': isLoadingMap})}
                disabled
                disableMapUI={false}
                location={location}
                onTilesLoaded={() => {
                  this.setState({isLoadingMap: false});
                }}
                restoreFrom={{gates, sides, polygons}}
                showControls={false} />
            </div>
          </div>
          {isPastDate(quote['expires_at']) && (
            <Notice>
              Oops, it looks like your quote has expired.
              Lumber and Labor prices can fluctuate depending on a number of
              factors throughout the year, therefore our quotes are only good
              for 30 days.  Your quote may not change, but we would like to
              update it for you. You clicking approve has alerted us and we
              are already in the process of updating your quote and someone
              will be in touch you shortly.  If you would rather not wait,
              simply contact us at <a href={`tel:${PHONE_NUMBER}`}>
                {formatPhoneNumber(PHONE_NUMBER)}
              </a>.
            </Notice>
          )}
          <div>
            {(sides || []).map(({description, distance, map_id: id, price}, index) => (
              <div className="flex-wrapper quote-line" key={`side-${id}`}>
                <div>
                  <div>
                    {this.renderQuotePreview(
                      this.getQuoteLineForCalcInputItem(quote['quote_lines'], getLabelFromIndex(index))
                    )}
                  </div>
                </div>
                <div className="quote-line-description">
                  <div className="spacing after__is-12">
                    <MapLabel isInline={true} name={getLabelFromIndex(index)} type="Label" />
                    <b>Side {getLabelFromIndex(index)}</b>
                  </div>
                  <div>
                    {description}
                  </div>
                </div>
                <div className="quote-line-price">
                  <div className="mobile-length spacing before__is-12 after__is-12">Length: {distance} ft.</div>
                  <div><b>{formatPrice(price)}</b></div>
                  <div className="desktop-length spacing before__is-12">Length: {distance} ft.</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {(gates || []).map(({description, map_id: id, name, price}, index) => (
              <div className="flex-wrapper quote-line" key={`gate-${id}`}>
                <div>
                  {this.renderQuotePreview(
                    this.getQuoteLineForCalcInputItem(quote['quote_lines'], index + 1),
                    name === '!' || name === 'Complications',
                  )}
                </div>
                <div className="quote-line-description">
                  <div className="spacing after__is-12">
                    <MapLabel name={index + 1} type="Circle" />
                    <span>{name}</span>
                  </div>
                  <div>
                    {description}
                  </div>
                </div>
                <div className="quote-line-price spacing before__is-12">
                  <div><b>{formatPrice(price)}</b></div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {(polygons || []).map(({description, area, map_id: id, price}, index) => (
              <div className="flex-wrapper quote-line" key={`area-${id}`}>
                <div>
                  {this.renderQuotePreview(
                    this.getQuoteLineForCalcInputItem(quote['quote_lines'], getLabelFromIndex(index))
                  )}
                </div>
                <div className="quote-line-description">
                  <div className="spacing after__is-12">
                    <MapLabel name={getLabelFromIndex(index)} type="LabelYellow" />
                    <b>Area {getLabelFromIndex(index)}</b>
                  </div>
                  <div>
                    {description}
                  </div>
                </div>
                <div className="quote-line-price">
                  <div className="mobile-length spacing before__is-12 after__is-12">Area: {area} sr.</div>
                  <div><b>{formatPrice(price)}</b></div>
                  <div className="desktop-length spacing before__is-12">Area: {area} sr.</div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-price spacing after__is-24">
            <span><b>Total {formatPrice(this.getTotal(quote))}</b></span>
            <span className="asterisk">*</span>
          </div>
          <div className="asterisk-notes">
            <i>An additional 2% fee will be added for credit cards</i>
            <span className="asterisk">*</span>
          </div>
        </div>

        {quote['description_html'] && (
          <div className="quote-notes card shadow">
            <h4>Project notes</h4>
            <div className="quote-projects-notes">{
              // eslint-disable-next-line react/no-danger
            } <div dangerouslySetInnerHTML={{__html: quote['description_html']}}/>
            </div>
          </div>
        )}
        {designs.length > 0 &&
          <div className="quote-design-notes">
            <div>
              <h4 className="quote-design-notes__title">Materials and design</h4>
              <div className="quote-design-notes__content">
                {designs.map(({name, description, image}, id) => (
                  <div className="quote-design-notes__content-item" key={id}>
                    <div className="quote-design-notes__img">
                      <img src={image} />
                    </div>
                    <div className="quote-design-notes__name">{name}</div>
                    {description && <p>{description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
