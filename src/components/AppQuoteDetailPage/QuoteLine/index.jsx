import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import {Button, ImageGallery} from '@ergeon/core-components';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
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
 *  isInstallerPreview: boolean,
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
    name,
    price,
    quantity,
    unit,
    quote,
    quoteLineQuoteId,
    tags,
    type,
    isInstallerPreview,
    images,
  } = props;

  const imagePreview = useMemo(() => (
    <div>{label ? <PreviewForQuoteLine {...props} /> : <PreviewForCalcInfo {...props} />}</div>
  ), [label, props]);

  // Used on classNames to correctly trigger pdf classes to modify our layout
  const isQuoteLinePDF = useMemo(() => isPDFMode() && images, [images]);

  return (
    <div className={classNames('quote-line', {'quote-line__pdf': isQuoteLinePDF})} key={`side-${id}`}>
      {/* Check for pdfMode, as this modifies our layout to display images underneat if we have any */}
      {isPDFMode() && !images && imagePreview}
      {/* Layout changes from desktop to mobile, as we move the gallery depeding on each */}
      <div className="desktop-length">
        {!isPDFMode() && imagePreview}
      </div>
      <div className={classNames('quote-line-description', {'quote-line-description__pdf': isQuoteLinePDF})}>
        <Title index={index} label={label} name={name} type={type} />
        <div className="mobile-length">
          {!isPDFMode() && imagePreview}
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
        {!isPDFMode() && !isEmpty(images) &&
          <div className="quote-line-buttons desktop-length">
            <Button className="quote-line-imageGallery" flavor="regular">
              Images
              <ImageGallery images={images.map((elem) => ({url: elem.file, ...elem}))} />
            </Button>
          </div>
        }
      </div>
      <div className={classNames('quote-line-price', {'quote-line-price__pdf': isQuoteLinePDF})}>
        {isAllowedUnitDisplay(isInstallerPreview, catalog) && (
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
        {!isInstallerPreview && <h5>{formatPrice(price)}</h5>}
        {isAllowedUnitDisplay(isInstallerPreview, catalog) && (
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
      {/* This is only used on isPDFMode, as we will render all images underneat if any */}
      {isPDFMode() && images && (
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
  images: PropTypes.array,
  index: PropTypes.number,
  isInstallerPreview: PropTypes.bool,
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
