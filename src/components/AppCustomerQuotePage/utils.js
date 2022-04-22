import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';

export const QUOTE_LINE_STATUSES = {
  APPROVED: 'APPROVED',
  NEEDS_APPROVAL: 'NEEDS_APPROVAL',
  TO_BE_DROPPED: 'TO_BE_DROPPED',
};

export const prepareQuoteApprovalLines = (quoteApprovalLines, quote) => {
  return quoteApprovalLines.map((quoteApprovalLine) => {
    let status = QUOTE_LINE_STATUSES.NEEDS_APPROVAL;

    const quoteLine = quoteApprovalLine['quote_line'];

    const isDroppedBefore = quoteLine['is_dropped'] && quoteLine['dropped_at_quote_id'] !== quote.id;
    const isApprovedBefore = quoteLine['quote_id'] !== quote.id;
    const toBeDropped = quoteLine['is_dropped'] && quoteLine['dropped_at_quote_id'] === quote.id;

    if (toBeDropped) {
      status = QUOTE_LINE_STATUSES.TO_BE_DROPPED;
    } else if (isDroppedBefore || isApprovedBefore) {
      status = QUOTE_LINE_STATUSES.APPROVED;
    }

    return {
      ...quoteLine,
      percentage: quoteApprovalLine['percentage'],
      price: quoteApprovalLine['amount'],
      totalPrice: isUpcomingFeaturesEnabled('ENG-11541') ? quoteLine['display_price'] : quoteLine['price'],
      status,
    };
  });
};
