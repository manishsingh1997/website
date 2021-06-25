import React from 'react';
import PropTypes from 'prop-types';
import {formatDate} from 'utils/date';

import {DRIVEWAY_QUANTITY_UNIT, FENCE_QUANTITY_UNIT} from 'website/constants';

/**
 * Renders length wrap in <span>
 * @param {{distance: number|string}} props
 */
export const Distance = ({distance}) => (
  <span>
    Length: {distance} {FENCE_QUANTITY_UNIT}
  </span>
);

Distance.propTypes = {
  distance: PropTypes.number,
};

/**
 * Renders length by unit wrapped in <span>
 * @param {{quantity: number, unit: number}} props
 */
export const QuantityUnit = ({quantity, unit}) => (
  <span>
    Length: {Math.round(quantity)} {unit}.
  </span>
);

QuantityUnit.propTypes = {
  quantity: PropTypes.number,
  unit: PropTypes.string,
};

/**
 * Renders area wrapped in <span>
 * @param {{area: number}} props
 */
export const Area = ({area}) => (
  <span>
    Area: {area} {DRIVEWAY_QUANTITY_UNIT}
  </span>
);

Area.propTypes = {
  area: PropTypes.number,
};

/**
 * Formats approvedAt as date wrapped in <div>
 * @param {{approvedAt: string}} props
 */
export const Approved = ({approvedAt}) => (
  <div>
    <b className="quote-line-approved-at-label">APPROVED AT: {formatDate(approvedAt)}</b>
  </div>
);

Approved.propTypes = {
  approvedAt: PropTypes.string,
};
