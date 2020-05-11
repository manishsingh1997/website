import React from 'react';
import PropTypes from 'prop-types';
import {some} from 'lodash';

import {Notification} from '@ergeon/core-components';
import {isPDFMode} from 'utils/utils';
import {parseAPIError} from 'utils/api';
import {
  formatPrice,
  isQuoteApproved,
  isQuoteReplaced,
  isQuoteCancelled,
  isQuoteExpired,
} from 'utils/app-order';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';

import {
  getQuoteDetails,
  reviewQuote as reviewQuoteAPI,
  approveAndPayQuote,
} from 'api/app';

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
import {HTTP_STATUS_NOT_FOUND} from '../../website/constants';
import NotFoundPage from '../NotFoundPage';

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
    isLoading: true,
    isLoadingForm: false,
    quote: null,
    quoteError: null,
    paymentMethod: null,
    paymentMethodError: null,
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

    try {
      const data = await getQuoteDetails(this.customerGID, this.props.match.params.secret);
      this.setState({
        quote: data.data,
        quoteError: null,
        paymentMethodError: null,
      });
    } catch (apiError) {
      this.setState({
        quote: null,
        quoteError: parseAPIError(apiError),
      });
    } finally {
      this.setState({isLoading: false});
    }
  }

  async approveQuoteToAPI(stripeToken) {
    this.setState({isLoadingForm: true});
    try {
      const data = await approveAndPayQuote(this.customerGID, this.props.match.params.secret, stripeToken);
      const updatedQuote = data.data;
      this.setState({
        quote: updatedQuote,
        paymentMethod: updatedQuote['payment_method'],
        paymentMethodError: null,
      });
    } catch (apiError) {
      this.setState({
        paymentMethod: null,
        paymentMethodError: parseAPIError(apiError).nonFieldErrors.join('\n'),
      });
    } finally {
      this.setState({isLoadingForm: false});
    }
  }

  async handleBillingSubmit(data) {
    await this.approveQuoteToAPI(data['stripe_token']);
  }

  async reviewQuote() {
    const {quote} = this.state;
    if (
      quote && !some([
        this.isDirectPreview(),
        this.isVendorPreview(),
        quote['reviewed_at'],
        isPDFMode(),
      ])
    ) {
      try {
        await reviewQuoteAPI(this.context, this.props.match.params.secret);
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

  shouldShowBillingForm() {
    const {quote} = this.state;
    const isPDFModeDisabled = !isPDFMode();

    return (
      isPDFModeDisabled &&
      !isQuoteReplaced(quote) &&
      !isQuoteCancelled(quote) &&
      !isQuoteExpired(quote)
    );
  }

  renderQuoteError() {
    const {statusCode, data} = this.state.quoteError;
    if (statusCode === HTTP_STATUS_NOT_FOUND) {
      return <NotFoundPage/>;
    }

    let error = '';
    if (data && data.detail) {
      error = {detail: error};
    }

    return (
      <Notification
        mode="embed"
        type="Error">
        There was an error trying to retrieve quote.<br />
        {error}
      </Notification>
    );
  }

  render() {
    const {auth} = this.props;
    const {
      isLoadingForm,
      isLoading,
      quote,
      quoteError,
      paymentMethod,
      paymentMethodError,
    } = this.state;

    if (isLoading) {
      return <AppLoader />;
    }
    if (quoteError) {
      return this.renderQuoteError();
    }
    if (!quote) {
      return null;
    }
    const {
      order: {house: {id: houseId}},
      warranty,
    } = quote;

    const designs = this.getQuoteDesigns(quote);

    return (
      <div className="quote-detail-page">
        <QuoteDetails
          asPDF={isPDFMode()}
          auth={auth}
          customerGID={this.customerGID}
          getNewQuoteLink={this.getNewQuoteLink.bind(this)}
          isVendorPreview={this.isVendorPreview()}
          quote={quote}
          totalPrice={formatPrice(this.getTotalPrice(quote))}/>
        <ProjectNotes quote={quote}/>
        <MaterialsAndDesign designs={designs}/>
        {this.shouldShowBillingForm() && <BillingForm
          error={paymentMethodError}
          houseId={houseId}
          loading={isLoadingForm}
          onSubmit={this.handleBillingSubmit.bind(this)}
          paymentMethod={paymentMethod}
          quoteApproved={isQuoteApproved(quote)}
          quoteId={quote['id']}
          termsAndConditionsUrl={quote['terms_and_conditions']}
          total={formatPrice(this.getTotalPrice(quote))} />}
        <ExplanationSection asPDF={isPDFMode()} warrantyLink={warranty}/>
      </div>
    );
  }
}
