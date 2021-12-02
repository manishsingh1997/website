import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import {isQuoteLineOfMapKinds, getTagsForQuoteLine, getImagesForQuoteLine} from './utils';
import QuoteLine from '../QuoteLine';

/**
 *  Builds up sides, gates and areas arrays by using calcInput or filterByField quoteLines
 *  then we render each one with their respective props to correctly display their data.
 * @param {{showPrice: boolean, asPDF: boolean, quote: object, isInstallerPreview: boolean}} props
 */
export default function QuoteLinesRender(props) {
  const {showPrice = true, asPDF, quote, isInstallerPreview} = props;
  const {'calc_input': calcInput} = quote;
  const filterByField = isInstallerPreview ? 'display_to_installer' : 'display_to_customer';

  const quoteLines = useMemo(() => {
    let gates = [], sides = [], areas = [];
    // if we have calcInput present we will render CalcInfo quotlines,
    // if not then regular quotelines will be rendered.
    if (calcInput) {
      gates = calcInput.gates || [];
      sides = calcInput.sides || [];
      areas = calcInput.polygons || [];
    } else {
      sides = quote['quote_lines']
        .filter(quoteLine => isQuoteLineOfMapKinds(quoteLine, ['line']))
        .filter(quoteLine => quoteLine[filterByField] === true);
      gates = quote['quote_lines']
        .filter(quoteLine => isQuoteLineOfMapKinds(quoteLine, ['point', null, undefined]))
        .filter(quoteLine => quoteLine[filterByField] === true);
      areas = quote['quote_lines']
        .filter(quoteLine => isQuoteLineOfMapKinds(quoteLine, ['area']))
        .filter(quoteLine => quoteLine[filterByField] === true);
    }

    const getQuoteLinePropsFromSide = (side, i) => ({
      ...side,
      id: side.map_id,
      approvedAt: side.approved_at,
      type: CALC_SIDE_TYPE,
      quote,
      index: i,
      isInstallerPreview,
      // show tags only when calcInput is present
      tags: calcInput ? getTagsForQuoteLine(getLabelFromIndex(i), quote) : undefined,
      price: showPrice ? side.price : 0,
      images: getImagesForQuoteLine(getLabelFromIndex(i), quote),
    });

    const getQuoteLinePropsFromGate = (gate, i) => ({
      ...gate,
      id: gate.map_id,
      approvedAt: gate.approved_at,
      type: CALC_GATE_TYPE,
      quote,
      index: i,
      isInstallerPreview,
      // show tags only when calcInput is present
      tags: calcInput ? getTagsForQuoteLine(i + 1, quote) : undefined,
      price: showPrice ? gate.price : 0,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : gate.distance,
      images: getImagesForQuoteLine(String(i + 1), quote),
    });

    const getQuoteLinePropsFromAreas = (area, i) => ({
      ...area,
      id: area.map_id,
      approvedAt: area.approved_at,
      type: CALC_AREA_TYPE,
      quote,
      index: i,
      isInstallerPreview,
      price: showPrice ? area.price : 0,
      // hide distance if calcInput is present
      distance: calcInput ? undefined : area.distance,
    });
    return [
      ...sides.map(getQuoteLinePropsFromSide),
      ...gates.map(getQuoteLinePropsFromGate),
      ...areas.map(getQuoteLinePropsFromAreas),
    ];
  }, [isInstallerPreview, quote, showPrice, calcInput, filterByField]);

  return (
    <>
      <div className="page-break">{asPDF && <h4>Project Scope</h4>}
        <div className="quote-details__sides spacing before__is-24">
        </div>
        <div>
          {quoteLines.map(quoteLineProps => (
            <QuoteLine
              key={`${quoteLineProps.type}-${quoteLineProps.id}`}
              {...quoteLineProps} />
          ))}
        </div>
      </div>
    </>
  );
}

QuoteLinesRender.propTypes = {
  asPDF: PropTypes.bool,
  isInstallerPreview: PropTypes.bool,
  quote: PropTypes.object,
  showPrice: PropTypes.bool,
};
