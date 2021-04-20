import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import QuoteLinesRender from './QuoteLinesRender';

/**
 * Renders regular QuoteLines or CalcInfo quote lines (calcInput value present)
 * @param {{asPDF: boolean, isInstallerPreview: boolean, quote: object}} props
 */
export default function QuoteLines({asPDF, isInstallerPreview, quote}) {
  const showPrice = !isEmpty(quote['quote_lines']);
  return (
    <QuoteLinesRender asPDF={asPDF} isInstallerPreview={isInstallerPreview} quote={quote} showPrice={showPrice} />
  );
}

QuoteLines.propTypes = {
  asPDF: PropTypes.bool,
  isInstallerPreview: PropTypes.bool,
  quote: PropTypes.object,
};
