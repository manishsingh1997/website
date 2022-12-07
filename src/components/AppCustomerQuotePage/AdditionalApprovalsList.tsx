import React from 'react';

import QuoteApproval from './QuoteApproval';

const AdditionalApprovalsList = ({additionalQuoteApprovals}) => (
  <React.Fragment>
    <div className="additional-approvers card padding-40 soft-border spacing after__is-48">
      <div className="heading-md-text">Additional Approvers</div>
      <table className="additional-approvers-list">
        <tbody>
          {additionalQuoteApprovals?.map((quoteApproval, idx) => (
            <QuoteApproval idx={idx} key={idx} quoteApproval={quoteApproval} />
          ))}
        </tbody>
      </table>
    </div>
  </React.Fragment>
);

export default AdditionalApprovalsList;
