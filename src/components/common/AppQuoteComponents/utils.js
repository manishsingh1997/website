import {getLabelFromIndex} from '@ergeon/draw-map';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';

export const QUOTE_LINE_STATUSES = {
  APPROVED: 'APPROVED',
  NEEDS_APPROVAL: 'NEEDS_APPROVAL',
  TO_BE_DROPPED: 'TO_BE_DROPPED',
};

export const hideDroppedLabels = (projectCalcInput, quoteLines) => {
  const linesByLabel = {};
  for (const quoteLine of quoteLines) {
    linesByLabel[quoteLine.label] = quoteLine['is_dropped'];
  }

  const newCalcInput = {
    ...projectCalcInput,
    sides: [],
    polygons: [],
    gates: [],
  };
  const calcInputKeys = Object.keys(newCalcInput);
  calcInputKeys.forEach((fieldName) => {
    if (!projectCalcInput[fieldName]) {
      return;
    }
    projectCalcInput[fieldName].forEach((item, index) => {
      let label;
      if (fieldName === 'sides' || fieldName === 'polygons') {
        label = getLabelFromIndex(index);
      } else {
        label = index.toString();
      }

      const isLabelDropped = linesByLabel[label] === true;
      newCalcInput[fieldName].push({
        ...item,
        is_dropped: isLabelDropped,
      });
    });
  });

  return newCalcInput;
};

export const prepareQuoteLines = (quoteLines, quote) => {
  return quoteLines.map(quoteLine => {
    let status = QUOTE_LINE_STATUSES.NEEDS_APPROVAL;

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
      totalPrice: isUpcomingFeaturesEnabled('ENG-11541') ? quoteLine['display_price'] : quoteLine['price'],
      status,
    };
  });
};

export const prepareQuoteApprovalLines = (quoteApprovalLines, quote) => {
  const quoteLines = quoteApprovalLines.map(quoteApprovalLine => {
    return {
      ...quoteApprovalLine['quote_line'],
      percentage: quoteApprovalLine['percentage'],
      price: quoteApprovalLine['amount'],
    };
  });
  return prepareQuoteLines(quoteLines, quote);
};
