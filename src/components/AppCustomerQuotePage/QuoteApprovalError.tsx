import React, {memo} from 'react';
import QuoteError from '../common/AppQuoteComponents/QuoteError';

const QuoteApprovalError = ({quoteApprovalError}: {quoteApprovalError: string | null}) => {
  if (quoteApprovalError) {
    return <QuoteError quoteError={quoteApprovalError} />;
  }

  return (
    <QuoteError
      description={
        'The quote is missing an address and cannot be displayed. Please message your Ergeon representative.'
      }
      title="Quote Inconsistency"
    />
  );
};

export default memo(QuoteApprovalError);
