import React from 'react';
import PropTypes from 'prop-types';

import {QUOTE_LINE_STATUSES} from '../utils';
import {Approved} from './QuoteLineComponents';
import QuoteLineStatus from './QuoteLineStatus';
import Tags from './QuoteLineTags';

export default function QuoteLineDescription(props) {
  const {approvedAt, description, quote, quoteId, status, tags} = props;

  const isApprovedAtShown = approvedAt && quoteId !== quote.id;

  return (
    <>
      {/*
        We render quote_lines from the quote data.
        If this quote is the change order quote, the rendering results should contain
        the quote_lines from both: the quote itself and from the parent quote.
        For the quote line that belongs to the quote_lines from the change order quote
        there should be no "APPROVED AT".
      */}
      <div>
        {isApprovedAtShown && <Approved approvedAt={approvedAt} />}
        <QuoteLineStatus {...{quote, status}} />
      </div>
      <div className="quote-line-description-text">{description}</div>
      <Tags tags={tags} />
    </>
  );
}

QuoteLineDescription.propTypes = {
  approvedAt: PropTypes.string,
  description: PropTypes.string,
  quote: PropTypes.object,
  quoteId: PropTypes.number,
  status: PropTypes.oneOf([
    QUOTE_LINE_STATUSES.APPROVED,
    QUOTE_LINE_STATUSES.TO_BE_DROPPED,
    QUOTE_LINE_STATUSES.NEEDS_APPROVAL,
  ]),
  tags: PropTypes.array,
};
