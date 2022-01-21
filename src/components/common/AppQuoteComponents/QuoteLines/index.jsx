import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import {isQuoteLineOfMapKinds, getTagsForQuoteLine, getImagesForQuoteLine} from './utils';
import QuoteLine from '../QuoteLine';
import {showUpcomingFeatures} from '../../../../utils/utils';

/*
 * Filter sides from calcInput that were not found in quote lines.
 */
const getAdditionalSidesFromCalcInput = (calcInputSides, quoteLineSides) => {
  return calcInputSides.map((side, index) => {
    const sideLabel = getLabelFromIndex(index);
    return {
      ...side,
      label: sideLabel,
      calcInputQuoteLine: true,
    };
  }).filter(side => {
    const existingQuoteLineSide = quoteLineSides.find(quoteLineSide => quoteLineSide.label == side.label);
    return existingQuoteLineSide === undefined;
  });
};

/*
 * Filter gates and areas from calcInput that were not found in quote lines.
 */
const getAdditionalPointsFromCalcInput = (calcInputPoints, quoteLinePoints) => {
  return calcInputPoints.map((point, index) => {
    const pointLabel = (index + 1).toString();
    return {
      ...point,
      label: pointLabel,
      calcInputQuoteLine: true,
    };
  }).filter(point => {
    const existingQuoteLinePoint = quoteLinePoints.find(quoteLinePoint => quoteLinePoint.label == point.label);
    return existingQuoteLinePoint === undefined;
  });
};

/**
 * Get sides from the quote lines. In addition it tries to extract sides from the `calcInput`.
 */
const getSides = (quoteLines, filterByField, calcInput) => {
  const quoteLineSides = quoteLines.filter(
    quoteLine => isQuoteLineOfMapKinds(quoteLine, ['line'])
  );
  const calcInputSides = getAdditionalSidesFromCalcInput(calcInput.sides || [], quoteLineSides);
  const filteredQuoteLines = quoteLineSides.filter(quoteLine => quoteLine[filterByField] === true);
  return [...filteredQuoteLines, ...calcInputSides];
};

/**
 * Get gates from the quote lines. In addition it tries to extract gates from the `calcInput`.
 */
const getGates = (quoteLines, filterByField, calcInput) => {
  const quoteLineGates = quoteLines.filter(
    quoteLine => isQuoteLineOfMapKinds(quoteLine, ['point', null, undefined])
  );
  const calcInputGates = getAdditionalPointsFromCalcInput(calcInput.gates || [], quoteLineGates);
  const filteredQuoteLines = quoteLineGates.filter(quoteLine => quoteLine[filterByField] === true);
  return [...filteredQuoteLines, ...calcInputGates];
};

/**
 * Get areas from the quote lines. In addition it tries to extract areas from the `calcInput`.
 */
const getAreas = (quoteLines, filterByField, calcInput) => {
  const quoteLineAreas = quoteLines.filter(
    quoteLine => isQuoteLineOfMapKinds(quoteLine, ['area'])
  );
  const calcInputAreas = getAdditionalPointsFromCalcInput(calcInput.areas || [], quoteLineAreas);
  const filteredQuoteLines = quoteLineAreas.filter(quoteLine => quoteLine[filterByField] === true);
  return [...filteredQuoteLines, ...calcInputAreas];
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
  let calcInput = quote['calc_input'];
  if (showUpcomingFeatures()) {
    calcInput = quote['project_calc_input'];
  }
  const filterByField = isInstallerPreview ? 'display_to_installer' : 'display_to_customer';

  const preparedQuoteLines = useMemo(() => {
    let sides, gates, areas, needToSort;

    // TODO: This should stop using calcInput after rolling out ENG-9225
    if (!isMultiPartyQuote && calcInput) {
      sides = calcInput.sides || [];
      gates = calcInput.gates || [];
      areas = calcInput.polygons || [];
      needToSort = false;
    } else {
      sides = getSides(quoteLines, filterByField, calcInput);
      gates = getGates(quoteLines, filterByField, calcInput);
      areas = getAreas(quoteLines, filterByField, calcInput);
      needToSort = true;
    }

    const getQuoteLinePropsFromSide = (side, i) => ({
      ...side,
      id: side.map_id,
      approvedAt: side.approved_at,
      quoteId: side.quote_id,
      type: CALC_SIDE_TYPE,
      quote,
      index: i,
      isBuildSpecAvailable: side.is_build_spec_available,
      isDropped: side['is_dropped'],
      // show tags only when calcInput is present
      tags: calcInput ? getTagsForQuoteLine(getLabelFromIndex(i), quote) : undefined,
      price: side.price,
      images: getImagesForQuoteLine(getLabelFromIndex(i), quote),
    });

    const getQuoteLinePropsFromGate = (gate, i) => ({
      ...gate,
      id: gate.map_id,
      approvedAt: gate.approved_at,
      quoteId: gate.quote_id,
      type: CALC_GATE_TYPE,
      quote,
      index: i,
      isBuildSpecAvailable: gate.is_build_spec_available,
      isDropped: gate['is_dropped'],
      // show tags only when calcInput is present
      tags: calcInput ? getTagsForQuoteLine(i + 1, quote) : undefined,
      price: gate.price,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : gate.distance,
      images: getImagesForQuoteLine(String(i + 1), quote),
    });

    const getQuoteLinePropsFromArea = (area, i) => ({
      ...area,
      id: area.map_id,
      approvedAt: area.approved_at,
      quoteId: area.quote_id,
      type: CALC_AREA_TYPE,
      quote,
      isBuildSpecAvailable: area.is_build_spec_available,
      isDropped: area['is_dropped'],
      index: i,
      price: area.price,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : area.distance,
    });

    // sorts lines using labels by letter first and digit last
    const sortLines = (lines) => {

      return lines
        // include an identifier that we will use to sort
        .map(line =>
          [line.label.toLowerCase().replace(/([a-z])|(\d)|./sg,
            // lets use 1 for letters, 2 for digits and 3 for the rest, should look like this:
            // '1a', '21'...
            (match, letter, digit) => (letter ? 1 : digit ? 2 : 3) + match), line]
        )
        .sort(([a], [b]) => a.localeCompare(b))
        // return the original lines sorted
        .map(line => line[1]);
    };

    const preparedQuoteLines = [
      ...sides.map(getQuoteLinePropsFromSide),
      ...gates.map(getQuoteLinePropsFromGate),
      ...areas.map(getQuoteLinePropsFromArea),
    ];

    return needToSort ? sortLines(preparedQuoteLines) : preparedQuoteLines;
  }, [quote, quoteLines, calcInput, filterByField, isMultiPartyQuote]);

  return (
    <>
      <div className="page-break">{asPDF && <h4>Project Scope</h4>}
        <div className="quote-details__sides spacing before__is-24">
        </div>
        <div>
          {preparedQuoteLines.map(quoteLineProps => (
            <QuoteLine
              isInstallerPreview={isInstallerPreview}
              isMultiPartyQuote={isMultiPartyQuote}
              isPrimaryQuoteApproval={isPrimaryQuoteApproval}
              key={`${quoteLineProps.type}-${quoteLineProps.id}`}
              onBuildDetailsClick={onBuildDetailsClick}
              {...quoteLineProps} />
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
