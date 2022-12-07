import React from 'react';

import PropTypes from 'prop-types';

import {QUOTE_LINE_STATUSES} from '../utils';

export default function QuoteLineStatus({status, quote}) {
  switch (status) {
    case QUOTE_LINE_STATUSES.TO_BE_DROPPED:
      return (
        <span className="quote-line-additional-info-label">
          <b> - TO BE REMOVED</b>
        </span>
      );
    case QUOTE_LINE_STATUSES.NEEDS_APPROVAL:
      if (quote['is_scope_change']) {
        return (
          <span className="quote-line-additional-info-label">
            <b>NEW</b>
          </span>
        );
      }
      break;
    default:
      break;
  }
  return null;
}

QuoteLineStatus.propTypes = {
  quote: PropTypes.object,
  status: PropTypes.oneOf([
    QUOTE_LINE_STATUSES.APPROVED,
    QUOTE_LINE_STATUSES.TO_BE_DROPPED,
    QUOTE_LINE_STATUSES.NEEDS_APPROVAL,
  ]),
};
