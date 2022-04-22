import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {isPDFMode} from 'utils/utils';

import {QUOTE_LINE_STATUSES} from '../../../AppCustomerQuotePage/utils';

export default function QuoteLineLayout(props) {
  const {children, status} = props;

  return (
    <div
      className={classNames('quote-line', `quote-line-status-${status.toLowerCase()}`, {
        'quote-line__pdf': isPDFMode(),
      })}
    >
      {children}
    </div>
  );
}

QuoteLineLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  status: PropTypes.oneOf([
    QUOTE_LINE_STATUSES.APPROVED,
    QUOTE_LINE_STATUSES.TO_BE_DROPPED,
    QUOTE_LINE_STATUSES.NEEDS_APPROVAL,
  ]),
};
