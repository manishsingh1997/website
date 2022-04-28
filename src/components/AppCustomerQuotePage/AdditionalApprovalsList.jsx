import React from 'react';
import PropTypes from 'prop-types';

import {formatDateAndTime} from 'utils/date';

export default class AdditionalApprovalsList extends React.Component {
  static propTypes = {
    additionalQuoteApprovals: PropTypes.arrayOf(PropTypes.object),
  };

  renderQuoteApproval(quoteApproval, idx) {
    const {
      customer: {full_name: fullName},
      approved_at: approvedAt,
    } = quoteApproval;
    const status = approvedAt ? `Approved at ${formatDateAndTime(approvedAt)}` : 'Pending approval';

    return (
      <tr className="additional-approvers-list-item" key={`additional-approver-${quoteApproval.id}_${idx}`}>
        <td className="additional-approvers-list-item-name">{fullName}</td>
        <td className="additional-approvers-list-item-status">{status}</td>
      </tr>
    );
  }

  render() {
    const {additionalQuoteApprovals} = this.props;

    return (
      <React.Fragment>
        <div className="additional-approvers card padding-40 soft-border spacing after__is-48">
          <h4>Additional Approvers</h4>
          <table className="additional-approvers-list">{additionalQuoteApprovals.map(this.renderQuoteApproval)}</table>
        </div>
      </React.Fragment>
    );
  }
}
