import React from 'react';
import PropTypes from 'prop-types';

import {formatPrice} from 'utils/app-order';

import {isAllowedUnitDisplay} from './utils';
import {Area, Distance, QuantityUnit} from './QuoteLineComponents';

export default function QuoteLinePrice(props) {
  const {
    area,
    catalog,
    distance,
    isInstallerPreview,
    price,
    quantity,
    unit,
  } = props;

  // Price should not be visible for installer
  const isPriceShown = !isInstallerPreview;

  if (!isAllowedUnitDisplay(isInstallerPreview, catalog)) {
    return null;
  }

  return (
    <>
      <div className="desktop-length mobile-length spacing before__is-12 after__is-12">
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
      {isPriceShown && <h5>{formatPrice(price)}</h5>}
    </>
  );
}

QuoteLinePrice.propTypes = {
  area: PropTypes.number,
  catalog: PropTypes.object,
  distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isInstallerPreview: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.string,
  unit: PropTypes.string,
};
