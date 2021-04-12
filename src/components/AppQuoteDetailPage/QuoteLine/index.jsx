import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';
import {isPDFMode} from 'utils/utils';
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

  const imagePreview = useMemo(() => (
    <div>{label ? <PreviewForQuoteLine {...props} /> : <PreviewForCalcInfo {...props} />}</div>
  ), [label, props]);

  // Used on classNames to correctly trigger pdf classes to modify our layout
  // Note: when removing upcoming flag we should refactor to only check for isPDFMode() on classNames
  // as this will become rendunant
  const isQuoteLinePDF = useMemo(() => isUpcomingFeaturesEnabled() && isPDFMode(), []);

  return (
    <div className={classNames('quote-line', {'quote-line__pdf': isQuoteLinePDF})} key={`side-${id}`}>
      {/* Note: when removing upcoming flag, we should always check for pdfMode, line below should be taken out */}
      {!isUpcomingFeaturesEnabled() && imagePreview}
      {/* Layout changes from desktop to mobile, as we move the gallery depeding on each */}
      <div className="desktop-length">
        {isUpcomingFeaturesEnabled() && !isPDFMode() && imagePreview}
      </div>
      <div className={classNames('quote-line-description', {'quote-line-description__pdf': isQuoteLinePDF})}>
        <Title index={index} label={label} type={type} />
        <div className="mobile-length">
          {isUpcomingFeaturesEnabled() && !isPDFMode() && imagePreview}
        </div>
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
      <div className={classNames('quote-line-price', {'quote-line-price__pdf': isQuoteLinePDF})}>
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
      {/* This is only used on isPDFMode, as we will render all images underneat */}
      {isUpcomingFeaturesEnabled() && isPDFMode() && (
        <div className="quote-line-images spacing before__is-12 after__is-12">
          {imagePreview}
        </div>
      )}
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
