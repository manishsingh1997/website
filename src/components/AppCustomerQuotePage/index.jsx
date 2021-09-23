import React from 'react';
import PropTypes from 'prop-types';
import {some} from 'lodash';

import {isPDFMode} from 'utils/utils';
import {parseAPIError} from 'utils/api';
import {
  formatPrice,
  isQuoteReplaced,
  isQuoteCancelled,
  isQuoteExpired,
} from 'utils/app-order';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';

import {
  getQuoteApprovalDetails,
  reviewQuoteApproval as reviewQuoteApprovalAPI,
  approveQuoteApproval as approveQuoteApprovalAPI,
} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import {
  DIRECT_PREVIEW_SLUG,
} from 'website/constants';
import BillingForm from './BillingForm';
import ExplanationSection from './ExplanationSection';
import ProjectNotes from './ProjectNotes';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';
import {prepareQuoteApprovalLines} from './utils';

import '@ergeon/draw-map/styles.css';

import '../common/AppQuoteComponents/index.scss';

export default class AppCustomerQuotePage extends React.Component {

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
    isLoading: true,
    quoteApproval: null,
    quoteApprovalError: null,
    paymentMethod: null,
    paymentMethodError: null,
  };

  async componentDidMount() {
    await this.getQuoteApprovalDetailsFromAPI();
    await this.reviewQuoteApproval();
  }

  static contextType = CustomerGIDContext;

  get customerGID() {
    return this.context;
  }

  isDirectPreview() {
    return this.props.match.params.type === DIRECT_PREVIEW_SLUG;
  }

  isQuoteApprovalReviewed() {
    return this.state.quoteApproval['reviewed_at'] !== null;
  }

  isQuoteApprovalApproved() {
    return this.state.quoteApproval['approved_at'] !== null;
  }

  getNewQuoteLink() {
    const {location, match} = this.props;
    const {quoteApproval: {new_quote_approval: newQuoteApproval}} = this.state;
    if (!newQuoteApproval) {
      return null;
    }
    return location.pathname.replace(match.params.secret, newQuoteApproval.secret);
  }

  async getQuoteApprovalDetailsFromAPI() {
    try {
      const data = await getQuoteApprovalDetails(this.customerGID, this.props.match.params.secret);
      this.setState({
        quoteApproval: data.data,
        quoteApprovalError: null,
        paymentMethodError: null,
      });
    } catch (apiError) {
      this.setState({
        quoteApproval: null,
        quoteApprovalError: parseAPIError(apiError),
      });
    } finally {
      this.setState({isLoading: false});
    }
  }

  async reviewQuoteApproval() {
    const {quoteApproval} = this.state;
    if (
      quoteApproval && !some([
        this.isDirectPreview(),
        this.isQuoteApprovalReviewed(),
        isPDFMode(),
      ])
    ) {
      try {
        await reviewQuoteApprovalAPI(this.context, this.props.match.params.secret);
      } catch (apiError) {
        console.error(apiError);
      }
    }
  }

  async handleBillingSubmit(data) {
    await this.approveQuoteApproval(data['stripe_token']);
  }

  async approveQuoteApproval(stripeToken) {
    try {
      const data = await approveQuoteApprovalAPI(this.customerGID, this.props.match.params.secret, stripeToken);
      const updatedQuoteApproval = data.data;
      this.setState({
        quoteApproval: updatedQuoteApproval,
        paymentMethod: updatedQuoteApproval['payment_method'],
        paymentMethodError: null,
      });
    } catch (apiError) {
      this.setState({
        paymentMethod: null,
        paymentMethodError: parseAPIError(apiError).nonFieldErrors.join('\n'),
      });
    }
  }

  getTotalPrice(quoteApproval) {
    return Number.parseFloat(quoteApproval['total_price']);
  }

  getTotalPreviouslyApprovedPrice(quoteApproval) {
    if (quoteApproval.parent_quote_approval) {
      return this.getTotalPrice(quoteApproval.parent_quote_approval);
    }
    return Number('0');
  }

  getProjectTotalPrice(quoteApproval) {
    return this.getTotalPreviouslyApprovedPrice(quoteApproval) + this.getTotalPrice(quoteApproval);
  }

  shouldShowBillingForm() {
    const {quoteApproval} = this.state;

    return (
      !isPDFMode() &&
      !isQuoteReplaced(quoteApproval.quote) &&
      !isQuoteCancelled(quoteApproval.quote) &&
      !isQuoteExpired(quoteApproval.quote)
    );
  }

  renderQuoteApprovalError() {
    return (
      <QuoteError quoteError={this.state.quoteApprovalError} />
    );
  }

  render() {
    const {
      isLoading,
      quoteApproval,
      quoteApprovalError,
      paymentMethod,
      paymentMethodError,
    } = this.state;

    if (isLoading) {
      return <AppLoader />;
    }
    if (quoteApprovalError) {
      return this.renderQuoteApprovalError();
    }
    if (!quoteApproval) {
      return null;
    }
    const {customer, quote, quote_approval_lines: quoteApprovalLines} = quoteApproval;
    const {
      order: {
        house: {id: houseId},
      },
      contract: contractUrl,
    } = quote;
    const quoteLines = prepareQuoteApprovalLines(quoteApprovalLines);
    const newQuoteApprovalLink = this.getNewQuoteLink();
    const {auth} = this.props;
    const asPDF = isPDFMode();
    return (
      <div className="quote-detail-page">
        <QuoteDetails
          asPDF={asPDF}
          auth={auth}
          customer={customer}
          customerGID={this.customerGID}
          isInstallerPreview={false}
          newQuoteLink={newQuoteApprovalLink}
          quote={quote}
          quoteLines={quoteLines}
          totalPreviouslyApprovedPrice={formatPrice(this.getTotalPreviouslyApprovedPrice(quoteApproval))}
          totalPrice={formatPrice(this.getTotalPrice(quoteApproval))}
          totalProjectPrice={formatPrice(this.getProjectTotalPrice(quoteApproval))} />
        <ProjectNotes quote={quote}/>
        {this.shouldShowBillingForm() && <BillingForm
          contractUrl={contractUrl}
          error={paymentMethodError}
          houseId={houseId}
          isApproved={this.isQuoteApprovalApproved()}
          onSubmit={this.handleBillingSubmit.bind(this)}
          paymentMethod={paymentMethod}
          quoteId={quote['id']}
          total={formatPrice(this.getTotalPrice(quoteApproval))} />}
        <ExplanationSection
          asPDF={asPDF}
          contractUrl={contractUrl} />
      </div>
    );
  }
}
