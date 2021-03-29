import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import QuoteLinesRender from './QuoteLinesRender';

/**
 * Renders regular QuoteLines or CalcInfo quote lines (calcInput value present)
 * @param {{asPDF: boolean, isVendorPreview: boolean, quote: object}} props
 */
export default function QuoteLines({asPDF, isVendorPreview, quote}) {
  const showPrice = !isEmpty(quote['quote_lines']);
  return (
    <QuoteLinesRender asPDF={asPDF} isVendorPreview={isVendorPreview} quote={quote} showPrice={showPrice} />
  );
}

QuoteLines.propTypes = {
  asPDF: PropTypes.bool,
  isVendorPreview: PropTypes.bool,
  quote: PropTypes.object,
};
