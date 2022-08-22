import React from 'react';

import PropTypes from 'prop-types';

import {formatPrice} from 'utils/app-order';

import {isAllowedUnitDisplay} from './utils';
import {Area, QuantityUnit} from './QuoteLineComponents';

export default function QuoteLinePrice(props) {
  const {
    area,
    catalogType,
    index,
    isInstallerPreview,
    isMultiPartyQuote,
    isPrimaryQuoteApproval,
    label,
    percentage,
    price,
    quantity,
    totalPrice,
    unit,
  } = props;

  // Price should not be visible for installer
  const isPriceShown = !isInstallerPreview;

  if (!isAllowedUnitDisplay(isInstallerPreview, catalogType)) {
    return null;
  }

  return (
    <>
      <div className="spacing before__is-12 after__is-12">
        {quantity && unit && <QuantityUnit quantity={parseFloat(quantity)} unit={unit} />}
        {area && <Area area={area} />}
      </div>
      {isPriceShown && (
        <div>
          <h5>{formatPrice(price)}</h5>
          {isMultiPartyQuote && (
            <div className="quote-line-price-percentage">
              {percentage}% of {label ? label : index + 1}
            </div>
          )}
          {isMultiPartyQuote && isPrimaryQuoteApproval && (
            <div className="quote-line-price-total-price">Total price: {formatPrice(totalPrice)}</div>
          )}
        </div>
      )}
    </>
  );
}

QuoteLinePrice.propTypes = {
  area: PropTypes.number,
  catalogType: PropTypes.object,
  index: PropTypes.number,
  isInstallerPreview: PropTypes.bool,
  isMultiPartyQuote: PropTypes.bool,
  isPrimaryQuoteApproval: PropTypes.bool,
  label: PropTypes.string,
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.string,
  totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};
