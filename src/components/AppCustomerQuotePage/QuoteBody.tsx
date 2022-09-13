import React, {useCallback, useMemo} from 'react';

import {isEmpty} from 'lodash';
import {useHistory, useParams} from 'react-router-dom';

import QuoteDetails from '../common/AppQuoteComponents/QuoteDetails';
import {prepareQuoteApprovalLines} from '../common/AppQuoteComponents/utils';
import {formatPrice, isQuoteCancelled, isQuoteExpired, isQuoteReplaced} from '../../utils/app-order';
import {isPDFMode} from '../../utils/utils';

import AdditionalApprovalsList from './AdditionalApprovalsList';
import BillingForm from './BillingForm';
import CustomerDetails from './CustomerDetails';
import ExplanationSection from './ExplanationSection';
import ProjectNotes from './ProjectNotes';
import {
  getProjectTotalPrice,
  getTotalPreviouslyApprovedPrice,
  getTotalPrice,
  isQuoteApprovalApproved,
  isScopeChange,
} from './utils';
import {Params, QuoteBodyProps} from './types';
import ProjectSignOff from './ProjectSignOff/ProjectSignOff';
import {ProjectSignOffProps} from './ProjectSignOff/types';

const QuoteBody = (props: QuoteBodyProps & ProjectSignOffProps) => {
  const {
    approvalPayMethod,
    approvalPayMethodError,
    approveQuoteApproval,
    auth,
    customerGID,
    match,
    quoteApproval,
    isSigned,
    pdfURL,
    shouldShowSignoffComponents,
    signedDate,
  } = props;

  const history = useHistory();
  const params: Params = useParams();

  const contractUrl = useMemo(() => quoteApproval.contract_pdf, [quoteApproval]);
  const customer = useMemo(() => quoteApproval.customer, [quoteApproval]);
  const isPrimaryQuoteApproval = useMemo(() => quoteApproval.is_primary, [quoteApproval]);
  const quoteApprovalLines = useMemo(() => quoteApproval.quote_approval_lines, [quoteApproval]);
  const otherQuoteApprovals = useMemo(() => quoteApproval.other_quote_approvals, [quoteApproval]);
  const mergedCustomerPDF = useMemo(() => quoteApproval.merged_customer_pdf, [quoteApproval]);
  const houseId = useMemo(() => quoteApproval.quote.order.house.id, [quoteApproval]);
  const quoteType = useMemo(() => quoteApproval.quote.order.product.name, [quoteApproval]);
  const isMultiPartyQuote = useMemo(() => !isEmpty(otherQuoteApprovals), [otherQuoteApprovals, isEmpty]);
  const isBillingFormSmall = useMemo(() => {
    return !!params?.quoteId;
  }, [params?.quoteId]);

  const quoteLines = useMemo(() => {
    return prepareQuoteApprovalLines(quoteApprovalLines, quoteApproval.quote);
  }, [quoteApproval, quoteApprovalLines, prepareQuoteApprovalLines]);

  const newQuoteApprovalLink = useMemo(() => {
    const newQuoteApproval = quoteApproval?.new_quote_approval;
    if (!newQuoteApproval) {
      return null;
    }
    return location.pathname.replace(match.params.secret, newQuoteApproval.secret);
  }, [location, match, quoteApproval]);

  const lastApprovedProjectRevisionQuoteApprovalLink = useMemo(() => {
    const lastApprovedProjectRevisionQuoteApproval = quoteApproval?.last_approved_project_revision_quote_approval;
    if (
      !lastApprovedProjectRevisionQuoteApproval ||
      // Current quote-approval is already the latest approved one
      lastApprovedProjectRevisionQuoteApproval.secret === match.params.secret
    ) {
      return null;
    }
    return location.pathname.replace(match.params.secret, lastApprovedProjectRevisionQuoteApproval.secret);
  }, [location, match, quoteApproval]);

  const asPDF = useMemo(() => isPDFMode(), []);

  const onBuildDetailsClick = useCallback(
    (configID: string, label: string) => {
      history.push(`${location.pathname.replace(/\/$/, '')}/config/${configID}`, {label});
    },
    [location]
  );

  const shouldShowBillingForm = useCallback(() => {
    return (
      !asPDF &&
      !isQuoteReplaced(quoteApproval.quote) &&
      !isQuoteCancelled(quoteApproval.quote) &&
      !isQuoteExpired(quoteApproval.quote)
    );
  }, [quoteApproval, asPDF]);

  const handleBillingSubmit = useCallback(
    async (data: {[key: string]: string}) => {
      await approveQuoteApproval(data['stripe_token']);
    },
    [approveQuoteApproval]
  );

  return (
    <>
      <QuoteDetails
        asPDF={asPDF}
        auth={auth}
        customer={customer}
        customerGID={customerGID}
        customerPDF={mergedCustomerPDF}
        isInstallerPreview={false}
        isMultiPartyQuote={isMultiPartyQuote}
        isPrimaryQuoteApproval={isPrimaryQuoteApproval}
        lastApprovedProjectRevisionQuoteApprovalLink={lastApprovedProjectRevisionQuoteApprovalLink}
        newQuoteLink={newQuoteApprovalLink}
        onBuildDetailsClick={onBuildDetailsClick}
        quote={quoteApproval.quote}
        quoteLines={quoteLines}
        totalPreviouslyApprovedPrice={formatPrice(getTotalPreviouslyApprovedPrice(quoteApproval))}
        totalPrice={formatPrice(getTotalPrice(quoteApproval))}
        totalProjectPrice={formatPrice(getProjectTotalPrice(quoteApproval))}
      />
      <ProjectNotes quote={quoteApproval.quote} />
      <CustomerDetails customer={customer} quote={quoteApproval.quote} />
      {shouldShowBillingForm() && (
        <BillingForm
          approvalPayMethod={approvalPayMethod}
          contractUrl={contractUrl}
          error={approvalPayMethodError}
          houseId={houseId}
          isApproved={isQuoteApprovalApproved(quoteApproval.quote)}
          isScopeChange={isScopeChange(quoteApproval)}
          isSmall={isBillingFormSmall}
          onSubmit={handleBillingSubmit}
          quoteId={quoteApproval.quote.id}
          total={formatPrice(getProjectTotalPrice(quoteApproval))}
        />
      )}
      {isMultiPartyQuote && <AdditionalApprovalsList additionalQuoteApprovals={otherQuoteApprovals} />}
      {shouldShowSignoffComponents && <ProjectSignOff isSigned={isSigned} pdfURL={pdfURL} signedDate={signedDate} />}
      <ExplanationSection asPDF={asPDF} contractUrl={contractUrl} quoteType={quoteType} />
    </>
  );
};

export default QuoteBody;
