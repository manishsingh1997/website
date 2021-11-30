import React from 'react';
import PropTypes from 'prop-types';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import AppConfigPreview from '../../AppConfigPreview';
import {useIsMobileWidth} from './customHooks';

/**
 * Process props data and sends to AppConfigPreview as props to render it
 * @param {{
 *  quote: object,
 *  distance: number,
 *  quoteLine, object,
 *  type: string,
 *  useNoPreviewIcon: boolean,
 *  usePlaceHolder: boolean
 * }} props
 */
export default function QuoteLinePreview(props) {
  const {quote, distance, quoteLine, type, useNoPreviewIcon = false, usePlaceHolder = false, images} = props;
  // check if address exists, in rare cases in can be null
  const zipCode = quote.order.house.address
    ? quote.order.house.address['zip_code']
    : quote.order.house.customer['main_address']['zip_code'];
  const fenceSideLength = distance;
  const schemaCodeUrl = quoteLine && quoteLine.config && quoteLine.config['schema_code_url'];
  const isQuotePreviewPossible = quoteLine && quoteLine['is_quote_preview_possible'];
  const propertyData = quoteLine && quoteLine['property_config'] && quoteLine['property_config']['schema_code_url'];
  const propertySchemaCodeUrl =
    propertyData && propertyData.replace('schema', 'property_schema').replace('code', 'property_code');
  const showLink = isQuotePreviewPossible && !(usePlaceHolder || useNoPreviewIcon) && Boolean(schemaCodeUrl);

  const isMobileWidth = useIsMobileWidth();

  return (
    <AppConfigPreview
      className="quote-line-preview"
      configType={type}
      fenceSideLength={fenceSideLength}
      images={images}
      isMobileWidth={isMobileWidth}
      propertySchemaCodeUrl={propertySchemaCodeUrl}
      schemaCodeUrl={usePlaceHolder ? null : schemaCodeUrl}
      useNoPreviewIcon={useNoPreviewIcon}
      withLink={showLink}
      zipCode={zipCode} />
  );
}

QuoteLinePreview.propTypes = {
  distance: PropTypes.number,
  images: PropTypes.array,
  quote: PropTypes.object,
  quoteLine: PropTypes.object,
  type: PropTypes.oneOf([CALC_SIDE_TYPE, CALC_GATE_TYPE, CALC_AREA_TYPE]),
  useNoPreviewIcon: PropTypes.bool,
  usePlaceHolder: PropTypes.bool,
};
