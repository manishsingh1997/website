import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {isEmpty, some} from 'lodash';

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
import BuildSpecs from 'components/common/AppQuoteComponents/BuildSpecs';
import {
  DIRECT_PREVIEW_SLUG,
} from 'website/constants';
import CustomerDetails from './CustomerDetails';
import BillingForm from './BillingForm';
import ExplanationSection from './ExplanationSection';
import ProjectNotes from './ProjectNotes';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';
import {prepareQuoteApprovalLines} from './utils';
import {showUpcomingFeatures} from '../../utils/utils';

import '@ergeon/draw-map/styles.css';

import '../common/AppQuoteComponents/index.scss';
import AdditionalApprovalsList from './AdditionalApprovalsList';

export default class AppCustomerQuotePage extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    history: PropTypes.object,
    layout: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.shape({
        type: PropTypes.string,
        secret: PropTypes.string,
      }),
    }),
    setPDFHeaderPhoneAction: PropTypes.func,
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
    const {match} = this.props;
    return new RegExp(`${DIRECT_PREVIEW_SLUG}/?`).test(match.path);
  }

  isQuoteApprovalReviewed() {
    return this.state.quoteApproval['reviewed_at'] !== null;
  }

  isQuoteApprovalApproved() {
    return this.state.quoteApproval['approved_at'] !== null;
  }

  isScopeChange(quoteApproval) {
    // TODO: Remove when PRD ENG-8551 is finished
    // Quote is optional for parent quote approval, must be removed later
    return quoteApproval.quote && quoteApproval.quote['is_scope_change'] == true;
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
      const {
        setPDFHeaderPhoneAction,
      } = this.props;
      const {
        market_phone_number: phoneNumber,
      } = data.data.quote;
      const {layout} = this.props;
      if (phoneNumber && phoneNumber !== layout.phoneNumber && setPDFHeaderPhoneAction) {
        setPDFHeaderPhoneAction(phoneNumber);
      }
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
    const totalPrice = Number.parseFloat(quoteApproval['total_price']);
    if (showUpcomingFeatures() && this.isScopeChange(quoteApproval)) {
      // calculate total_price minus dropped lines
      const droppedLinesAmount = quoteApproval['quote_approval_lines'].map(
        line => line['quote_line'] // we need only quote_lines
      ).filter(quoteLine =>
        quoteLine['is_dropped'] &&
        quoteLine['dropped_at_quote_id'] == quoteApproval.quote.id // get all lines dropped at this quote
      ).map(quoteLine => parseFloat(quoteLine.price))
        .reduce((a, b) => a + b, 0); // calculate dropped amount
      return totalPrice - droppedLinesAmount;
    }
    return totalPrice;
  }

  getTotalPreviouslyApprovedPrice(quoteApproval) {
    if (showUpcomingFeatures() && this.isScopeChange(quoteApproval)) {
      const {quote_approval_lines: quoteApprovalLines} = quoteApproval;
      const approvedPreviousQuoteApprovalLines = quoteApprovalLines.filter(
        (line) => (
          line.quote_approval_id != quoteApproval.id && // get all previous quote approval lines
          (
            !line['quote_line']['is_dropped'] || // where they are either not dropped
            line['quote_line']['dropped_at_quote_id'] == quoteApproval.quote.id // or dropped at this quote
          )
        )
      );
      return approvedPreviousQuoteApprovalLines.reduce(
        (acc, line) => acc + parseFloat(line['quote_line'].price),
        0
      );
    }
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

  onBuildDetailsClick(configID, label) {
    const {history, location} = this.props;
    history.push(`${location.pathname.replace(/\/$/, '')}/config/${configID}`, {label});
  }

  renderQuoteApprovalError() {
    return (
      <QuoteError quoteError={this.state.quoteApprovalError} />
    );
  }

  render() {
    const {match} = this.props;
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
    const {
      customer,
      quote,
      is_primary: isPrimaryQuoteApproval,
      quote_approval_lines: quoteApprovalLines,
      other_quote_approvals: otherQuoteApprovals,
    } = quoteApproval;
    const {
      order: {
        house: {id: houseId},
        product: {name: quoteType},
      },
      contract: contractUrl,
    } = quote;
    const isMultiPartyQuote = !isEmpty(otherQuoteApprovals);
    const quoteLines = prepareQuoteApprovalLines(quoteApprovalLines, quote);
    const newQuoteApprovalLink = this.getNewQuoteLink();
    const {auth} = this.props;
    const asPDF = isPDFMode();
    return (
      <>
        <Route exact path={`${match.path}/config/:configID`}>
          <BuildSpecs />
        </Route>
        <div className="quote-detail-page">
          <QuoteDetails
            asPDF={asPDF}
            auth={auth}
            customer={customer}
            customerGID={this.customerGID}
            isInstallerPreview={false}
            isMultiPartyQuote={isMultiPartyQuote}
            isPrimaryQuoteApproval={isPrimaryQuoteApproval}
            newQuoteLink={newQuoteApprovalLink}
            onBuildDetailsClick={this.onBuildDetailsClick.bind(this)}
            quote={quote}
            quoteLines={quoteLines}
            totalPreviouslyApprovedPrice={formatPrice(this.getTotalPreviouslyApprovedPrice(quoteApproval))}
            totalPrice={formatPrice(this.getTotalPrice(quoteApproval))}
            totalProjectPrice={formatPrice(this.getProjectTotalPrice(quoteApproval))} />
          <ProjectNotes quote={quote}/>
          <CustomerDetails customer={customer} quote={quote} />
          {this.shouldShowBillingForm() && <BillingForm
            contractUrl={contractUrl}
            error={paymentMethodError}
            houseId={houseId}
            isApproved={this.isQuoteApprovalApproved()}
            isScopeChange={this.isScopeChange(quoteApproval)}
            onSubmit={this.handleBillingSubmit.bind(this)}
            paymentMethod={paymentMethod}
            quoteId={quote['id']}
            total={formatPrice(this.getProjectTotalPrice(quoteApproval))} />}
          {isMultiPartyQuote && <AdditionalApprovalsList
            additionalQuoteApprovals={otherQuoteApprovals} />}
          <ExplanationSection
            asPDF={asPDF}
            contractUrl={contractUrl}
            quoteType={quoteType}/>
        </div>
      </>
    );
  }
}
