import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import QuoteLine from '../QuoteLine';
import {isQuoteLineOfMapKinds, getImagesForQuoteLine, getBuildSpecsForQuoteLine} from './utils';

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

    const getQuoteLinePropsFromSide = (side, i) => ({
      ...side,
      approvedAt: side['approved_at'],
      quoteId: side['quote_id'],
      type: CALC_SIDE_TYPE,
      quote,
      index: i,
      isDropped: side['is_dropped'],
      tags: side.config.tags,
      images: getImagesForQuoteLine(getLabelFromIndex(i), quote),
      ...getBuildSpecsForQuoteLine(getLabelFromIndex(i), quote),
    });

    const getQuoteLinePropsFromGate = (gate, i) => ({
      ...gate,
      approvedAt: gate['approved_at'],
      quoteId: gate['quote_id'],
      type: CALC_GATE_TYPE,
      quote,
      index: i,
      isDropped: gate['is_dropped'],
      tags: gate.config.tags,
      images: getImagesForQuoteLine(String(i + 1), quote),
      ...getBuildSpecsForQuoteLine(String(i + 1), quote),
    });

    const getQuoteLinePropsFromArea = (area, i) => ({
      ...area,
      approvedAt: area['approved_at'],
      quoteId: area['quote_id'],
      type: CALC_AREA_TYPE,
      quote,
      isDropped: area['is_dropped'],
      index: i,
      images: getImagesForQuoteLine(String(i + 1), quote),
      ...getBuildSpecsForQuoteLine(String(i + 1), quote),
    });

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

    const preparedQuoteLines = [
      ...sides.map(getQuoteLinePropsFromSide),
      ...gates.map(getQuoteLinePropsFromGate),
      ...areas.map(getQuoteLinePropsFromArea),
    ];

    return sortLines(preparedQuoteLines);
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
