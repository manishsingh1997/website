import React, {useMemo} from 'react';
import {Route} from 'react-router-dom';

import {isPDFMode} from '../../utils/utils';
import BuildSpecs from '../common/AppQuoteComponents/BuildSpecs';
import ProjectSignOffPopUp from './ProjectSignOff/ProjectSignOffPopUp';
import ProjectSignOffTopNav from './ProjectSignOff/ProjectSignOffTopNav';
import QuoteBody from './QuoteBody';
import {DefaultContentProps} from './types';
import {getIsQuoteStatusApprovedOrCompleted} from './utils';

const DefaultContent = (props: DefaultContentProps) => {

  const {
    approveQuoteApproval,
    auth,
    customerGID,
    customerSignOffData,
    isCustomerSigned,
    isSignLoading,
    match,
    onSubmitSignature,
    paymentMethod,
    paymentMethodError,
    quoteApproval,
    signatureData,
  } = props

  const asPDF = useMemo(() => isPDFMode(), []);

  const isQuoteStatusApprovedOrCompleted = useMemo(() => {
      return getIsQuoteStatusApprovedOrCompleted(quoteApproval)
    }, [quoteApproval]);

  const shouldShowSignoffComponents = useMemo(() => {
      return !asPDF && isQuoteStatusApprovedOrCompleted
    }, [asPDF, isQuoteStatusApprovedOrCompleted]);

  return (
    <>
      {shouldShowSignoffComponents && <ProjectSignOffTopNav isSigned={isCustomerSigned} />}
      <Route exact path={`${match.path}/config/:configID`}>
        <BuildSpecs />
      </Route>
      <div className="quote-detail-page">
        <QuoteBody
          approveQuoteApproval={approveQuoteApproval}
          auth={auth}
          customerGID={customerGID}
          isSigned={isCustomerSigned}
          match={match}
          paymentMethod={paymentMethod}
          paymentMethodError={paymentMethodError}
          pdfURL={signatureData?.signedPDF}
          quoteApproval={quoteApproval}
          shouldShowSignoffComponents={shouldShowSignoffComponents}
          signedDate={signatureData?.signedDate}
        />
        {shouldShowSignoffComponents && (
          <ProjectSignOffPopUp
            isSigned={isCustomerSigned}
            loading={isSignLoading}
            onSubmit={onSubmitSignature}
            orderData={customerSignOffData}
            signatureData={signatureData}
          />
        )}
      </div>
    </>
  );
};

export default DefaultContent;
