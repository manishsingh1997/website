import React, {useCallback, useMemo} from 'react';
import {ReactSVG} from 'react-svg';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {Button, ImageGallery} from '@ergeon/core-components';
import IconArrowRight from '@ergeon/core-components/src/assets/icon-arrow-right.svg';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE, CALC_TYPE_TO_MAP_TYPE} from 'website/constants';
import {isPDFMode} from 'utils/utils';

import {QUOTE_LINE_STATUSES} from '../utils';
import {useIsMobileWidth} from './customHooks';
import QuoteLineDescription from './QuoteLineDescription';
import QuoteLineLayout from './QuoteLineLayout';
import QuoteLinePrice from './QuoteLinePrice';
import Title from './QuoteLineTitle';
import PreviewForQuoteLine from './QuoteLinePreviewQuoteLine';

import './index.scss';

export default function QuoteLine(props) {
  const {
    isInstallerPreview,
    isMultiPartyQuote,
    isPrimaryQuoteApproval,
    onBuildDetailsClick,
    ...quoteLineProps
  } = props;

  const {
    index,
    approvedAt,
    area,
    catalog,
    config,
    distance,
    description,
    label,
    percentage,
    price,
    quantity,
    unit,
    quote,
    quoteId,
    tags,
    totalPrice,
    type,
    isBuildSpecAvailable,
    images,
    status = QUOTE_LINE_STATUSES.NEEDS_APPROVAL,
    isDropped = false,
  } = quoteLineProps;

  const isMobileWidth = useIsMobileWidth();

  const imagePreview = useMemo(
    () => (
      <div>
        <PreviewForQuoteLine {...props} images={images} />
      </div>
    ),
    [images, props]
  );

  const onOpenBuildDetails = useCallback(() => {
    if (onBuildDetailsClick) {
      onBuildDetailsClick(config.id, {name: label, type: CALC_TYPE_TO_MAP_TYPE[type]});
    }
  }, [config, label, onBuildDetailsClick, type]);

  // Quote lines was dropped before this quote
  if (status === QUOTE_LINE_STATUSES.APPROVED && isDropped) {
    return null;
  }

  if (isPDFMode()) {
    return (
      <QuoteLineLayout status={status}>
        <div className="quote-line-wrapper">
          <div className="quote-line-info">
            {/* if no attached images */}
            {!images?.length && imagePreview}
            <div className="quote-line-description quote-line-description__pdf">
              <Title index={index} label={label} type={type} />
              <QuoteLineDescription {...{approvedAt, description, quote, quoteId, status, tags}} />
            </div>
            <div className="quote-line-price quote-line-price__pdf">
              <QuoteLinePrice
                {...{
                  area,
                  catalog,
                  distance,
                  index,
                  isInstallerPreview,
                  isMultiPartyQuote,
                  isPrimaryQuoteApproval,
                  label,
                  percentage,
                  price,
                  totalPrice,
                  quantity,
                  unit,
                }}
              />
            </div>
          </div>
          {images?.length ? (
            // This is only used on isPDFMode, as we will render all images below the content
            <div className="quote-line-images spacing before__is-12 after__is-12">{imagePreview}</div>
          ) : null}
        </div>
      </QuoteLineLayout>
    );
  }

  if (isMobileWidth) {
    return (
      <QuoteLineLayout status={status}>
        <div className="quote-line-description">
          <Title index={index} label={label} type={type} />
          {imagePreview}
          <div className="quote-line-buttons">
            {isBuildSpecAvailable && (
              <Button className="BuildSpecs-button" flavor="regular" onClick={onOpenBuildDetails} size="large">
                <span>Build Specifications</span>
                <div className="BuildSpecs-buttonIcon">
                  <ReactSVG src={IconArrowRight} />
                </div>
              </Button>
            )}
          </div>
          <QuoteLineDescription {...{approvedAt, description, quote, quoteId, status, tags}} />
        </div>
        <div className="quote-line-price">
          <QuoteLinePrice
            {...{
              area,
              catalog,
              distance,
              index,
              isInstallerPreview,
              isMultiPartyQuote,
              isPrimaryQuoteApproval,
              label,
              percentage,
              price,
              totalPrice,
              quantity,
              unit,
            }}
          />
        </div>
      </QuoteLineLayout>
    );
  }

  return (
    <QuoteLineLayout status={status}>
      {imagePreview}
      <div className="quote-line-description">
        <Title index={index} label={label} type={type} />
        <QuoteLineDescription {...{approvedAt, description, quote, quoteId, status, tags}} />
        <div className="quote-line-buttons">
          {!isEmpty(images) && (
            <Button className="quote-line-imageGallery" flavor="regular">
              Images
              <ImageGallery images={images.map((elem) => ({url: elem.file, ...elem}))} />
            </Button>
          )}
          {isBuildSpecAvailable && (
            <Button flavor="regular" onClick={onOpenBuildDetails}>
              Build Specifications
            </Button>
          )}
        </div>
      </div>
      <div className="quote-line-price">
        <QuoteLinePrice
          {...{
            area,
            catalog,
            distance,
            index,
            isInstallerPreview,
            isMultiPartyQuote,
            isPrimaryQuoteApproval,
            label,
            percentage,
            price,
            totalPrice,
            quantity,
            unit,
          }}
        />
      </div>
    </QuoteLineLayout>
  );
}

QuoteLine.propTypes = {
  approvedAt: PropTypes.string,
  area: PropTypes.number,
  catalog: PropTypes.object,
  config: PropTypes.object,
  description: PropTypes.string,
  distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  images: PropTypes.array,
  index: PropTypes.number,
  isBuildSpecAvailable: PropTypes.bool,
  isDropped: PropTypes.bool,
  isInstallerPreview: PropTypes.bool,
  isMultiPartyQuote: PropTypes.bool,
  isPrimaryQuoteApproval: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onBuildDetailsClick: PropTypes.func,
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.string,
  quote: PropTypes.object,
  quoteId: PropTypes.number,
  status: PropTypes.oneOf([
    QUOTE_LINE_STATUSES.APPROVED,
    QUOTE_LINE_STATUSES.TO_BE_DROPPED,
    QUOTE_LINE_STATUSES.NEEDS_APPROVAL,
  ]),
  tags: PropTypes.array,
  totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([CALC_SIDE_TYPE, CALC_GATE_TYPE, CALC_AREA_TYPE]),
  unit: PropTypes.string,
};

QuoteLine.defaultProps = {
  tags: [],
};
