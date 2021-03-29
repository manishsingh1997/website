import React from 'react';
import PropTypes from 'prop-types';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
import {formatPrice} from '../../../utils/app-order';

import {isAllowedUnitDisplay} from './utils';
import Tags from './QuoteLineTags';
import Title from './QuoteLineTitle';
import PreviewForCalcInfo from './QuoteLinePreviewCalcInfo';
import PreviewForQuoteLine from './QuoteLinePreviewQuoteLine';
import {Approved, Area, Distance, QuantityUnit} from './QuoteLineComponents';

/**
 * Renders quoteLine using quote data, uses label prop to
 * properly render by QuoteLine or CalcInfo
 * @param {{
 *  area: number,
 *  catalog: object,
 *  description: string,
 *  distance: string|number,
 *  id: string|number,
 *  index: number,
 *  isVendorPreview: boolean,
 *  label: string,
 *  name: string,
 *  price: string|number,
 *  quantity: string,
 *  quote: object,
 *  quoteLineQuoteId: number,
 *  tags: Array.<object>,
 *  type: string,
 *  unit: string,
 * }} props
*/
export default function QuoteLine(props) {
  const {
    id,
    index,
    approvedAt,
    area,
    catalog,
    distance,
    description,
    label,
    price,
    quantity,
    unit,
    quote,
    quoteLineQuoteId,
    tags,
    type,
    isVendorPreview,
  } = props;

  return (
    <div className="quote-line" key={`side-${id}`}>
      <div>
        <div>{label ? <PreviewForQuoteLine {...props} /> : <PreviewForCalcInfo {...props} />}</div>
      </div>
      <div className="quote-line-description">
        <Title index={index} label={label} type={type} />
        {/*
            We render quote_lines from the quote data.
            If this quote is the change order quote, the rendering results should contain
            the quote_lines from both: the quote itself and from the parent quote.
            For the quote line that belongs to the quote_lines from the change order quote
            there should be no "APPROVED AT".
          */}
        {approvedAt && quoteLineQuoteId !== quote.id && (
          <Approved approvedAt={approvedAt} />
        )}
        <div>{description}</div>
        <Tags tags={tags} />
      </div>
      <div className="quote-line-price">
        {isAllowedUnitDisplay(isVendorPreview, catalog) && (
          <div className="mobile-length spacing before__is-12 after__is-12">
            {distance && (
              <Distance distance={distance} />
            )}
            {quantity && unit && (
              <QuantityUnit quantity={quantity} unit={unit} />
            )}
            {area && (
              <Area area={area} />
            )}
          </div>
        )}
        {!isVendorPreview && <h5>{formatPrice(price)}</h5>}
        {isAllowedUnitDisplay(isVendorPreview, catalog) && (
          <div className="desktop-length spacing before__is-12">
            {distance && (
              <Distance distance={distance} />
            )}
            {quantity && unit && (
              <QuantityUnit quantity={quantity} unit={unit} />
            )}
            {area && (
              <Area area={area} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

QuoteLine.propTypes = {
  approvedAt: PropTypes.string,
  area: PropTypes.number,
  catalog: PropTypes.object,
  description: PropTypes.string,
  distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  isVendorPreview: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.string,
  quote: PropTypes.object,
  quoteLineQuoteId: PropTypes.number,
  tags: PropTypes.array,
  type: PropTypes.oneOf([CALC_SIDE_TYPE, CALC_GATE_TYPE, CALC_AREA_TYPE]),
  unit: PropTypes.string,
};

QuoteLine.defaultProps = {
  tags: [],
};
