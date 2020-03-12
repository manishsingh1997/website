import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {some} from 'lodash';

import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {Spinner, Notification} from '@ergeon/core-components';

import DrawMap, {getLabelFromIndex} from '@ergeon/draw-map';

import config from 'website/config';
import {formatDateAndTime, isPastDate} from 'utils/date';
import {getOrderDetailURL} from 'utils/urls';
import {formatPrice} from 'utils/app-order';
import {getParameterByName} from 'utils/utils';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import AppConfigPreview from 'components/common/AppConfigPreview';
import DataRow from 'components/common/DataRow';

import {getQuoteDetails, reviewQuote} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import {
  DIRECT_PREVIEW_SLUG,
  DRIVEWAY_QUANTITY_UNIT,
  ERGEON_LICENSE_NUMBER,
  FENCE_QUANTITY_UNIT,
  STATUS_CANCELLED,
  VENDOR_PREVIEW_SLUG,
} from 'website/constants';
import MapLabel from './MapLabel';
import BillingForm from './BillingForm';
import ExplanationSection from './ExplanationSection';
import {ReactSVG} from 'react-svg';
import ImgBack from 'assets/icon-arrow-left.svg';

import '@ergeon/draw-map/styles.css';

import './index.scss';
import {getExpiresAtTitle} from '../../utils/utils';

export default class AppQuoteDetailPage extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
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
    await this.reviewQuote();
  }

  static contextType = CustomerGIDContext;

  get customerGID() {
    return this.context;
  }

  isUserSignedIn() {
    const {auth : {user}} = this.props;
    return !!user;
  }

  async getQuoteDetailsFromAPI() {
    // We don't need this data in redux store for now, so calling API directly
    this.setState({isLoading: true, isLoadingMap: true});
    try {
      const data = await getQuoteDetails(this.customerGID, this.props.match.params.secret);
      this.setState({quote: data.data});
    } catch (apiError) {
      // TODO: show reasonable message
      throw apiError;
    } finally {
      this.setState({isLoading: false});
    }
  }

  handleBillingSubmit(data, approveOnly) {
    // TODO: Implement API call to /billing/method
    console.log('Billing api call data: ', data);
    console.log('approveOnly: ', approveOnly);
  }

  async reviewQuote() {
    const {quote} = this.state;
    if (
      quote && !some([
        this.isDirectPreview(),
        this.isVendorPreview(),
        quote['reviewed_at'],
        this.isPDFMode(),
      ])
    ) {
      try {
        await reviewQuote(this.context, this.props.match.params.secret);
      } catch (apiError) {
        console.error(apiError);
      }
    }
  }

  isQuoteCancelled(quote = {}) {
    return quote.status === STATUS_CANCELLED;
  }

  isQuoteReplaced(quote = {}) {
    return quote['replaced_by_quote'] && quote['replaced_by_quote']['secret'];
  }

  isVendorPreview() {
    return this.props.match.params.type === VENDOR_PREVIEW_SLUG;
  }

  isDirectPreview() {
    return this.props.match.params.type === DIRECT_PREVIEW_SLUG;
  }

  isPDFMode() {
    return getParameterByName('asPDF');
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
    if (!itemName) {
      return undefined;
    }
    return quoteLines.find((quoteLine) => !!quoteLine.label && quoteLine.label.toString() === itemName.toString());
  }

  getTotalPrice(quote) {
    if (this.isVendorPreview()) {
      return quote['total_cost'];
    }
    return quote['total_price'];
  }

  get linkToOrderPage() {
    const orderID = this.state.quote['order_id'];
    return getOrderDetailURL(this.customerGID, orderID);
  }

  renderBackButton() {
    return (
      <Link
        className="button button--regular button--size__small taste__boundless button-back"
        to={this.linkToOrderPage}>
        <ReactSVG className="gray-arrow-fill" src={ImgBack}/>Back to order</Link>
    );
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
        <Notification
          mode="embed"
          type="Information">
          This quote has been revised. Click
          <Link
            className="link"
            rel="noopener"
            target={'_blank'}
            to={this.getNewQuoteLink(quote)}>
            &nbsp;here
          </Link> to display the new revision
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

  renderPolygons() {
    const {quote} = this.state;
    const {
      'calc_input': {polygons},
    } = quote;
    return (
      <React.Fragment>
        <div>
          {(polygons || []).map(({description, area, map_id: id, price}, index) => (
            <div className="quote-line" key={`area-${id}`}>
              <div>
                {this.renderQuotePreview(
                  this.getQuoteLineForCalcInputItem(quote['quote_lines'], getLabelFromIndex(index))
                )}
              </div>
              <div className="quote-line-description">
                <div className="quote-line__title spacing after__is-12">
                  <MapLabel name={getLabelFromIndex(index)} type="LabelYellow" />
                  <h5>Area {getLabelFromIndex(index)}</h5>
                </div>
                <div>
                  {description}
                </div>
              </div>
              <div className="quote-line-price">
                <div className="mobile-length spacing before__is-12 after__is-12">
                  Area: {area} {DRIVEWAY_QUANTITY_UNIT}
                </div>
                <div><h5>{formatPrice(price)}</h5></div>
                <div className="desktop-length spacing before__is-12">
                  Area: {area} {DRIVEWAY_QUANTITY_UNIT}
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  renderCalcInfo() {
    const {quote} = this.state;
    const {
      'calc_input': {gates, sides},
    } = quote;
    return (
      <React.Fragment>
        <div className="page-break">{Boolean(this.isPDFMode()) && <h4>Project Scope</h4>}
          <div className="quote-details__sides spacing before__is-24">
            {(sides || []).map(({description, distance, map_id: id, price}, index) => (
              <div className="quote-line" key={`side-${id}`}>
                <div>
                  <div>
                    {this.renderQuotePreview(
                      this.getQuoteLineForCalcInputItem(quote['quote_lines'], getLabelFromIndex(index))
                    )}
                  </div>
                </div>
                <div className="quote-line-description">
                  <div className="quote-line__title spacing after__is-12">
                    <MapLabel isInline={true} name={getLabelFromIndex(index)} type="Label" />
                    <h5>Side {getLabelFromIndex(index)}</h5>
                  </div>
                  <div>
                    {description}
                  </div>
                </div>
                <div className="quote-line-price">
                  <div className="mobile-length spacing before__is-12 after__is-12">
                  Length: {distance} {FENCE_QUANTITY_UNIT}
                  </div>
                  <div><h5>{formatPrice(price)}</h5></div>
                  <div className="desktop-length spacing before__is-12">
                  Length: {distance} {FENCE_QUANTITY_UNIT}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {(gates || []).map(({description, map_id: id, name, price}, index) => (
              <div className="quote-line" key={`gate-${id}`}>
                <div>
                  {this.renderQuotePreview(
                    this.getQuoteLineForCalcInputItem(quote['quote_lines'], index + 1),
                    name === '!' || name === 'Complications',
                  )}
                </div>
                <div className="quote-line-description">
                  <div className="quote-line__title spacing after__is-12">
                    <MapLabel name={index + 1} type="Circle" />
                    <h5>{name}</h5>
                  </div>
                  <div>
                    {description}
                  </div>
                </div>
                <div className="quote-line-price spacing before__is-12">
                  <div><h5>{formatPrice(price)}</h5></div>
                </div>
              </div>
            ))}
          </div>
          {this.renderPolygons()}
        </div>
      </React.Fragment>
    );
  }

  renderQuoteLines() {
    const {quote} = this.state;
    const quoteLines = quote['quote_lines'];
    // sides is alphabetical values A, B, ... , AA
    let sides = quoteLines.filter(line => isNaN(line['label'])).sort(line => line['label']);
    // gates is integer values 1,2 ..., 99
    let gates = quoteLines.filter(line => !isNaN(line['label'])).sort(line => parseInt(line['label'], 10));

    return (
      <React.Fragment>
        <div>
          {(sides || []).map(({cost, description, id, label, quantity, unit}) => (
            <div className="quote-line" key={`side-${id}`}>
              <div>
                <div>
                  {this.renderQuotePreview(
                    this.getQuoteLineForCalcInputItem(quote['quote_lines'], label)
                  )}
                </div>
              </div>
              <div className="quote-line-description">
                <div className="quote-line__title spacing after__is-12">
                  <MapLabel isInline={true} name={label} type="Label" />
                  <h5>Side {label}</h5>
                </div>
                <div>
                  {description}
                </div>
              </div>
              <div className="quote-line-price">
                <div className="mobile-length spacing before__is-12 after__is-12">
                  Length: {Math.round(quantity)} {unit}.
                </div>
                <div><h5>{formatPrice(cost)}</h5></div>
                <div className="desktop-length spacing before__is-12">
                  Length: {Math.round(quantity)} {unit}.
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {(gates || []).map(({cost, description, id, label}) => (
            <div className="quote-line" key={`gate-${id}`}>
              <div>
                {this.renderQuotePreview(
                  this.getQuoteLineForCalcInputItem(quote['quote_lines'], label),
                  label === '!' || label === 'Complications',
                )}
              </div>
              <div className="quote-line-description">
                <div className="quote-line__title spacing after__is-12">
                  <MapLabel name={label} type="Circle" />
                  <h5>Gate {label}</h5>
                </div>
                <div>
                  {description}
                </div>
              </div>
              <div className="quote-line-price spacing before__is-12">
                <div><h5>{formatPrice(cost)}</h5></div>
              </div>
            </div>
          ))}
        </div>
        {this.renderPolygons()}
      </React.Fragment>
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
      order: {house: {address, customer, id: houseId, paymentMethod}},
      warranty,
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
    const expiresAt = quote['expires_at'];
    const expiresAtTitle = getExpiresAtTitle(expiresAt);
    const isPDFModeDisabled = !this.isPDFMode();

    return (
      <div className="quote-detail-page">
        <div className="quote-details card padding-40 soft-border spacing after__is-48">
          {isPDFModeDisabled && this.isQuoteCancelled(quote) && this.renderQuoteCancelledMessage(quote)}
          <div className="quote-details__description flex-wrapper spacing after__is-24">
            <div className="quote-details-wrapper">
              {this.isUserSignedIn() && isPDFModeDisabled && this.renderBackButton()}
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
                disableMapUI={Boolean(this.isPDFMode())}
                location={location}
                onTilesLoaded={() => {
                  this.setState({isLoadingMap: false});
                }}
                restoreFrom={{gates, sides, polygons}}
                showControls={false} />
            </div>
          </div>
          {isPDFModeDisabled && isPastDate(quote['expires_at']) && (
            <Notification
              mode="embed"
              type="Information">
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
            </Notification>
          )}
          {this.isVendorPreview() && quote['quote_lines']
            ? this.renderQuoteLines()
            : Boolean(quote['calc_input']) && this.renderCalcInfo()}
          <div className="total-price">
            <span><h4>Total: {formatPrice(this.getTotalPrice(quote))}
            </h4></span>

          </div>
          <div className="asterisk-notes">
            <span className="asterisk">*</span>
            <i> – An additional {config.CARD_TRANSACTION_FEE} fee will be added for credit cards</i>
          </div>
        </div>

        {quote['description_html'] && (
          <div className="quote-notes card padding-40 soft-border spacing after__is-48 page-break">
            <h4>Project notes</h4>
            <div className="quote-projects-notes">{
              // eslint-disable-next-line react/no-danger
            } <div dangerouslySetInnerHTML={{__html: quote['description_html']}}/>
            </div>
          </div>
        )}
        {designs.length > 0 &&
        <div className="quote-design-notes card padding-40 soft-border spacing after__is-48 page-break">
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
        {isPDFModeDisabled && <BillingForm
          houseId={houseId}
          onSubmit={this.handleBillingSubmit.bind(this)}
          paymentMethod={paymentMethod}
          quoteId={quote['id']}
          termsAndConditionsUrl={quote['terms_and_conditions']}
          total={formatPrice(this.getTotalPrice(quote))} />}
        <ExplanationSection asPDF={this.isPDFMode()} warrantyLink={warranty}/>
      </div>
    );
  }
}
