/* eslint-disable complexity */
// TODO ENG-14646 re-enable eslint-complexity checker after refactoring
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { isEmpty, some } from 'lodash';

import {
  getQuoteApprovalDetails,
  reviewQuoteApproval as reviewQuoteApprovalAPI,
  approveQuoteApproval as approveQuoteApprovalAPI,
  getCustomerSignOffData,
  updateCustomerSignOffRequirement
} from 'api/app';

import AppLoader from 'components/common/AppLoader';
import BuildSpecs from 'components/common/AppQuoteComponents/BuildSpecs';
import { DIRECT_PREVIEW_SLUG } from 'website/constants';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import { isPDFMode, showUpcomingFeatures } from '../../utils/utils';
import { parseAPIError } from '../../utils/api.ts';
import {
  formatPrice,
  isQuoteAddressValid,
  isQuoteReplaced,
  isQuoteCancelled,
  isQuoteExpired
} from '../../utils/app-order';
import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import QuoteError from '../common/AppQuoteComponents/QuoteError';
import { prepareQuoteApprovalLines } from '../common/AppQuoteComponents/utils';
import CustomerDetails from './CustomerDetails';
import BillingForm from './BillingForm';
import ExplanationSection from './ExplanationSection';
import ProjectNotes from './ProjectNotes';
import AdditionalApprovalsList from './AdditionalApprovalsList';
import ProjectSignOff from './ProjectSignOff/ProjectSignOff';
import ProjectSignOffPopUp from './ProjectSignOff/ProjectSignOffPopUp';
import ProjectSignOffTopNav from './ProjectSignOff/ProjectSignOffTopNav';

import '@ergeon/draw-map/styles.css';
import '../common/AppQuoteComponents/index.scss';

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
    isSignLoading: false,
    isCustomerSigned: false,
    signatureData: null,
    customerSignOffData: null,
  };

  async componentDidMount() {
    await this.getQuoteApprovalDetailsFromAPI();
    await this.reviewQuoteApproval();
    showUpcomingFeatures('ENG-13851') && await this.getSignOffData();
  }

  static contextType = CustomerGIDContext;

  get customerGID() {
    return this.context;
  }

  isSignOffPDFView() {
    return location.pathname.includes('/sign-off');
  }

  isDirectPreview() {
    const { match } = this.props;
    return new RegExp(`${DIRECT_PREVIEW_SLUG}/?`).test(match.path);
  }

  isQuoteApprovalReviewed() {
    return this.state.quoteApproval['reviewed_at'] !== null;
  }

  isQuoteApprovalApproved() {
    return this.state.quoteApproval['approved_at'] !== null;
  }

  isScopeChange(quoteApproval) {
    return quoteApproval.quote && quoteApproval.quote['is_scope_change'] == true;
  }

  getNewQuoteLink() {
    const { location, match } = this.props;
    const {
      quoteApproval: { new_quote_approval: newQuoteApproval },
    } = this.state;
    if (!newQuoteApproval) {
      return null;
    }
    return location.pathname.replace(match.params.secret, newQuoteApproval.secret);
  }

  async getQuoteApprovalDetailsFromAPI() {
    try {
      const data = await getQuoteApprovalDetails(this.customerGID, this.props.match.params.secret);
      const customer = data?.data?.customer;
      const quote = data?.data?.quote;
      const orderData = {
        orderId: quote?.id,
        customerName: customer?.full_name,
        customerAddress: customer?.main_address?.formatted_address,
        quoteDate: quote?.sent_to_customer_at,
      };
      this.setState({
        quoteApproval: data.data,
        quoteApprovalError: null,
        paymentMethodError: null,
        customerSignOffData: orderData,
      });
      const { setPDFHeaderPhoneAction } = this.props;
      const { market_phone_number: phoneNumber } = data.data.quote;
      const { layout } = this.props;
      if (phoneNumber && phoneNumber !== layout.phoneNumber && setPDFHeaderPhoneAction) {
        setPDFHeaderPhoneAction(phoneNumber);
      }
    } catch (apiError) {
      this.setState({
        quoteApproval: null,
        quoteApprovalError: parseAPIError(apiError),
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async reviewQuoteApproval() {
    const { quoteApproval } = this.state;
    if (quoteApproval && !some([this.isDirectPreview(), this.isQuoteApprovalReviewed(), isPDFMode()])) {
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
    return totalPrice;
  }

  getTotalPreviouslyApprovedPrice(quoteApproval) {
    if (this.isScopeChange(quoteApproval)) {
      return Number.parseFloat(quoteApproval['previously_approved_price']);
    }
    return Number('0');
  }

  getProjectTotalPrice(quoteApproval) {
    return Number.parseFloat(quoteApproval['project_total_price']);
  }

  shouldShowBillingForm() {
    const { quoteApproval } = this.state;

    return (
      !isPDFMode() &&
      !isQuoteReplaced(quoteApproval.quote) &&
      !isQuoteCancelled(quoteApproval.quote) &&
      !isQuoteExpired(quoteApproval.quote)
    );
  }

  onBuildDetailsClick(configID, label) {
    const { history, location } = this.props;
    history.push(`${location.pathname.replace(/\/$/, '')}/config/${configID}`, { label });
  }

  async getSignOffData() {
    let signatureData = null;
    const { data } = getCustomerSignOffData(this.customerGID);
    const { signoff_img, signoff_at, signoff_pdf } = data || {};
    if (signoff_img) {
      signatureData = {
        value: signoff_img,
        type: 'draw',
        signedDate: signoff_at,
        signedPDF: signoff_pdf,
      };
    }
    this.setState({
      signatureData,
      isCustomerSigned: !!signoff_pdf || !!signoff_at,
    });
  }

  async onSubmitSignature(value, type) {
    let signatureData = null;
    this.setState((prev) => ({ ...prev, isSignLoading: true }));

    if (!value || !type) return;
    try {
      const { data } = updateCustomerSignOffRequirement(this.customerGID, { value, type });
      const { signoff_img, signoff_at, signoff_pdf } = data || {};
      if (signoff_img) {
        signatureData = {
          value: signoff_img,
          type, // due to mocking, to be changed to draw
          signedDate: signoff_at,
          signedPDF: signoff_pdf,
        };
      }
      this.setState((prev) => ({ ...prev, signatureData, isCustomerSigned: true, isSignLoading: false }));
    } catch (err) {
      this.setState({ isSignLoading: false, });
      console.warn(err);
    }
  }

  renderSignOffPdfView() {
    const { isCustomerSigned, isSignLoading, signatureData, customerSignOffData } = this.state;
    const asPDF = isPDFMode();

    return showUpcomingFeatures('ENG-13851') && (
      <ProjectSignOffPopUp
        asPDF={asPDF}
        isSigned={isCustomerSigned}
        loading={isSignLoading}
        onSubmit={this.onSubmitSignature.bind(this)}
        orderData={customerSignOffData}
        signatureData={signatureData}
      />
    );
  }

  renderQuoteApprovalError() {
    return <QuoteError quoteError={this.state.quoteApprovalError} />;
  }

  render() {
    const { match } = this.props;
    const {
      isLoading,
      quoteApproval,
      quoteApprovalError,
      paymentMethod,
      paymentMethodError,
      isCustomerSigned,
      isSignLoading,
      signatureData,
      customerSignOffData,
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
      contract_pdf: contractUrl,
      customer,
      quote,
      is_primary: isPrimaryQuoteApproval,
      quote_approval_lines: quoteApprovalLines,
      other_quote_approvals: otherQuoteApprovals,
      merged_customer_pdf: mergedCustomerPDF,
    } = quoteApproval;
    const {
      order: {
        house: { id: houseId },
        product: { name: quoteType },
      },
    } = quote;
    const isMultiPartyQuote = !isEmpty(otherQuoteApprovals);
    const quoteLines = prepareQuoteApprovalLines(quoteApprovalLines, quote);
    const newQuoteApprovalLink = this.getNewQuoteLink();
    const { auth } = this.props;
    const asPDF = isPDFMode();

    if (!isQuoteAddressValid(quote)) {
      return (
        <QuoteError
          description={
            'The quote is missing an address and cannot be displayed. Please message your Ergeon representative.'
          }
          title="Quote Inconsistency"
        />
      );
    }

    if (this.isSignOffPDFView() && asPDF && isCustomerSigned) {
      return this.renderSignOffPdfView()
    }

    return (
      <>
        {showUpcomingFeatures('ENG-13851') && !asPDF && <ProjectSignOffTopNav isSigned={this.state.isCustomerSigned} />}
        <Route exact path={`${match.path}/config/:configID`}>
          <BuildSpecs />
        </Route>
        <div className="quote-detail-page">
          <QuoteDetails
            asPDF={asPDF}
            auth={auth}
            customer={customer}
            customerGID={this.customerGID}
            customerPDF={mergedCustomerPDF}
            isInstallerPreview={false}
            isMultiPartyQuote={isMultiPartyQuote}
            isPrimaryQuoteApproval={isPrimaryQuoteApproval}
            newQuoteLink={newQuoteApprovalLink}
            onBuildDetailsClick={this.onBuildDetailsClick.bind(this)}
            quote={quote}
            quoteLines={quoteLines}
            totalPreviouslyApprovedPrice={formatPrice(this.getTotalPreviouslyApprovedPrice(quoteApproval))}
            totalPrice={formatPrice(this.getTotalPrice(quoteApproval))}
            totalProjectPrice={formatPrice(this.getProjectTotalPrice(quoteApproval))}
          />
          <ProjectNotes quote={quote} />
          <CustomerDetails customer={customer} quote={quote} />
          {this.shouldShowBillingForm() && (
            <BillingForm
              contractUrl={contractUrl}
              error={paymentMethodError}
              houseId={houseId}
              isApproved={this.isQuoteApprovalApproved()}
              isScopeChange={this.isScopeChange(quoteApproval)}
              onSubmit={this.handleBillingSubmit.bind(this)}
              paymentMethod={paymentMethod}
              quoteId={quote['id']}
              total={formatPrice(this.getProjectTotalPrice(quoteApproval))}
            />
          )}
          {isMultiPartyQuote && <AdditionalApprovalsList additionalQuoteApprovals={otherQuoteApprovals} />}
          <ExplanationSection asPDF={asPDF} contractUrl={contractUrl} quoteType={quoteType} />
          {showUpcomingFeatures('ENG-13851') && !asPDF && (
            <ProjectSignOff
              isSigned={isCustomerSigned}
              pdfURL={signatureData?.signedPDF}
              signedDate={signatureData?.signedDate}
            />
          )}
          {showUpcomingFeatures('ENG-13851') && !asPDF && (
            <ProjectSignOffPopUp
              isSigned={isCustomerSigned}
              loading={isSignLoading}
              onSubmit={this.onSubmitSignature.bind(this)}
              orderData={customerSignOffData}
              signatureData={signatureData}
            />
          )}
        </div>
      </>
    );
  }
}
