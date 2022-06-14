import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import QuoteLine from '../QuoteLine';

/**
 * Check if quote-line's catalog_type.map_kind is of given types
 */
const isQuoteLineOfMapKinds = (quoteLine, types) => {
  const quoteType = quoteLine.catalogType.map_kind;
  return types.some((type) => type === quoteType);
};

/**
 * Get sides from the quote lines.
 */
const getSides = (quoteLines, filterByField) => {
  const quoteLineSides = quoteLines.filter((quoteLine) => isQuoteLineOfMapKinds(quoteLine, ['line']));
  return quoteLineSides.filter((quoteLine) => quoteLine[filterByField] === true);
};

/**
 * Get gates from the quote lines.
 */
const getGates = (quoteLines, filterByField) => {
  const quoteLineGates = quoteLines.filter((quoteLine) => isQuoteLineOfMapKinds(quoteLine, ['point', null, undefined]));
  return quoteLineGates.filter((quoteLine) => quoteLine[filterByField] === true);
};

/**
 * Get areas from the quote lines.
 */
const getAreas = (quoteLines, filterByField) => {
  const quoteLineAreas = quoteLines.filter((quoteLine) => isQuoteLineOfMapKinds(quoteLine, ['area']));
  return quoteLineAreas.filter((quoteLine) => quoteLine[filterByField] === true);
};

/**
 *  Builds up sides, gates and areas arrays by using filterByField quoteLines
 *  then we render each one with their respective props to correctly display their data.
 * @param {{
 *   asPDF: boolean,
 *   onBuildDetailsClick(): void,
 *   quote: object,
 *   quoteLines: array<object>,
 *   isInstallerPreview: boolean,
 * }} props
 */
export default function QuoteLines({
  asPDF,
  onBuildDetailsClick,
  quote,
  quoteLines,
  isInstallerPreview,
  isMultiPartyQuote,
  isPrimaryQuoteApproval,
}) {
  const filterByField = isInstallerPreview ? 'display_to_installer' : 'display_to_customer';

  const preparedQuoteLines = useMemo(() => {
    let sides = getSides(quoteLines, filterByField);
    let gates = getGates(quoteLines, filterByField);
    let areas = getAreas(quoteLines, filterByField);

    // sorts lines using labels by letter first and digit last
    const sortLines = (lines) => {
      return (
        lines
          // include an identifier that we will use to sort
          .map((line) => [
            line.label.toLowerCase().replace(
              /([a-z])|(\d)|./gs,
              // lets use 1 for letters, 2 for digits and 3 for the rest, should look like this:
              // '1a', '21'...
              (match, letter, digit) => (letter ? 1 : digit ? 2 : 3) + match
            ),
            line,
          ])
          .sort(([a], [b]) => a.localeCompare(b))
          // return the original lines sorted
          .map((line) => line[1])
      );
    };

    return sortLines([...sides, ...gates, ...areas]);
  }, [quote, quoteLines, filterByField]);

  return (
    <>
      <div className="quote-details__lines page-break">
        {asPDF && <h4>Project Scope</h4>}
        <div className="quote-details__sides spacing before__is-24"></div>
        <div>
          {preparedQuoteLines.map((quoteLineProps, idx) => (
            <QuoteLine
              isInstallerPreview={isInstallerPreview}
              isMultiPartyQuote={isMultiPartyQuote}
              isPrimaryQuoteApproval={isPrimaryQuoteApproval}
              // error complaining about mapping to keys with side-undefined
              key={`${quoteLineProps.type}-${quoteLineProps.id}-${quoteLineProps?.label}-${idx}`}
              onBuildDetailsClick={onBuildDetailsClick}
              {...quoteLineProps}
            />
          ))}
        </div>
      </div>
    </>
  );
}

QuoteLines.propTypes = {
  asPDF: PropTypes.bool,
  isInstallerPreview: PropTypes.bool,
  isMultiPartyQuote: PropTypes.bool,
  isPrimaryQuoteApproval: PropTypes.bool,
  onBuildDetailsClick: PropTypes.func,
  quote: PropTypes.object,
  quoteLines: PropTypes.arrayOf(PropTypes.object),
};
