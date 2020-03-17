import React from 'react';
import PropTypes from 'prop-types';
import {some} from 'lodash';

import {formatPrice} from 'utils/app-order';
import {getParameterByName} from 'utils/utils';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';

import {getQuoteDetails, reviewQuote} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import {
  DIRECT_PREVIEW_SLUG,
  VENDOR_PREVIEW_SLUG,
} from 'website/constants';
import BillingForm from './BillingForm';
import ExplanationSection from './ExplanationSection';

import '@ergeon/draw-map/styles.css';

import './index.scss';
import ProjectNotes from './ProjectNotes';
import MaterialsAndDesign from './MaterialsAndDesign';
import QuoteDetails from './QuoteDetails';

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

  isVendorPreview() {
    return this.props.match.params.type === VENDOR_PREVIEW_SLUG;
  }

  isDirectPreview() {
    return this.props.match.params.type === DIRECT_PREVIEW_SLUG;
  }

  isPDFMode() {
    return getParameterByName('asPDF');
  }

  getNewQuoteLink() {
    const {location, match} = this.props;
    const {quote} = this.state;
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

  getTotalPrice(quote) {
    if (this.isVendorPreview()) {
      return quote['total_cost'];
    }
    return quote['total_price'];
  }

  render() {
    const {auth} = this.props;
    const {isLoading, isLoadingMap, quote} = this.state;
    if (isLoading) {
      return <AppLoader />;
    }
    if (!quote) {
      return null;
    }
    const {
      order: {house: {id: houseId, paymentMethod}},
      warranty,
    } = quote;

    const designs = this.getQuoteDesigns(quote);
    const isPDFModeDisabled = !this.isPDFMode();

    return (
      <div className="quote-detail-page">
        <QuoteDetails
          asPDF={this.isPDFMode()}
          auth={auth}
          customerGID={this.customerGID}
          getNewQuoteLink={this.getNewQuoteLink}
          isLoadingMap={isLoadingMap}
          isVendorPreview={this.isVendorPreview()}
          quote={quote}
          totalPrice={formatPrice(this.getTotalPrice(quote))}/>
        <ProjectNotes quote={quote}/>
        <MaterialsAndDesign designs={designs}/>
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
