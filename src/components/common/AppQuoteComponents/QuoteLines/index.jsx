import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import {isQuoteLineOfMapKinds, getTagsForQuoteLine, getImagesForQuoteLine} from './utils';
import QuoteLine from '../QuoteLine';
import {showUpcomingFeatures} from '../../../../utils/utils';

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
}) {
  let calcInput = quote['calc_input'];
  if (showUpcomingFeatures()) {
    calcInput = quote['project_calc_input'];
  }
  const filterByField = isInstallerPreview ? 'display_to_installer' : 'display_to_customer';

  const preparedQuoteLines = useMemo(() => {
    const filteredQuoteLines = quoteLines.filter(quoteLine => quoteLine[filterByField] === true);
    const sides = filteredQuoteLines.filter(
      quoteLine => isQuoteLineOfMapKinds(quoteLine, ['line'])
    );
    const gates = filteredQuoteLines.filter(
      quoteLine => isQuoteLineOfMapKinds(quoteLine, ['point', null, undefined])
    );
    const areas = filteredQuoteLines.filter(
      quoteLine => isQuoteLineOfMapKinds(quoteLine, ['area'])
    );

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
      isInstallerPreview,
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
      isInstallerPreview,
      // show tags only when calcInput is present
      tags: calcInput ? getTagsForQuoteLine(i + 1, quote) : undefined,
      price: gate.price,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : gate.distance,
      images: getImagesForQuoteLine(i + 1, quote),
    });

    const getQuoteLinePropsFromAreas = (area, i) => ({
      ...area,
      id: area.map_id,
      approvedAt: area.approved_at,
      quoteId: area.quote_id,
      type: CALC_AREA_TYPE,
      quote,
      isBuildSpecAvailable: area.is_build_spec_available,
      isDropped: area['is_dropped'],
      index: i,
      isInstallerPreview,
      price: area.price,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : area.distance,
    });
    return [
      ...sides.map(getQuoteLinePropsFromSide),
      ...gates.map(getQuoteLinePropsFromGate),
      ...areas.map(getQuoteLinePropsFromAreas),
    ];
  }, [isInstallerPreview, quote, quoteLines, calcInput, filterByField]);

  return (
    <>
      <div className="page-break">{asPDF && <h4>Project Scope</h4>}
        <div className="quote-details__sides spacing before__is-24">
        </div>
        <div>
          {preparedQuoteLines.map(quoteLineProps => (
            <QuoteLine
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
  onBuildDetailsClick: PropTypes.func,
  quote: PropTypes.object,
  quoteLines: PropTypes.arrayOf(PropTypes.object),
};
