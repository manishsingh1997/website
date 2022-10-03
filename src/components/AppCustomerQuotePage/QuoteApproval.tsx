import React, {useMemo} from 'react';

import {formatDateAndTime} from '../../utils/date';

import {QuoteApprovalProp} from './types';

const QuoteApproval = ({quoteApproval, idx}: QuoteApprovalProp) => {
  const {
    customer: {full_name: fullName},
    approved_at: approvedAt,
  } = quoteApproval;
  const status = useMemo(
    () => (approvedAt ? `Approved at ${formatDateAndTime(approvedAt)}` : 'Pending approval'),
    [approvedAt]
  );

  return (
    <tr className="additional-approvers-list-item" key={`additional-approver-${quoteApproval.id}_${idx}`}>
      <td className="additional-approvers-list-item-name">{fullName}</td>
      <td className="additional-approvers-list-item-status">{status}</td>
    </tr>
  );
};

export default QuoteApproval;
