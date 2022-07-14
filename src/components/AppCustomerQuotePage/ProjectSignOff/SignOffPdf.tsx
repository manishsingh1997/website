import React, {useMemo} from 'react';
import ProjectSignOffPopUp from './../ProjectSignOff/ProjectSignOffPopUp';
import {SignOffPdfProps} from './../types';
import {getIsQuoteStatusApprovedOrCompleted} from './../utils';

const SignOffPdf = ({
  asPDF,
  customerSignOffData,
  isCustomerSigned,
  isSignLoading,
  onSubmitSignature,
  quoteApproval,
  signatureData,
}: SignOffPdfProps) => {
  const isQuoteStatusApprovedOrCompleted = useMemo(
    () => {
      return getIsQuoteStatusApprovedOrCompleted(quoteApproval)
    },
    [quoteApproval]
  );

  if (isQuoteStatusApprovedOrCompleted) {
    return null;
  }

  return (
    <ProjectSignOffPopUp
      asPDF={asPDF}
      isSigned={isCustomerSigned}
      loading={isSignLoading}
      onSubmit={onSubmitSignature}
      orderData={customerSignOffData}
      signatureData={signatureData}
    />
  );
};

export default SignOffPdf;
