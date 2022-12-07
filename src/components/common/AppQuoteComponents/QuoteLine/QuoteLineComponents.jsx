import React from 'react';

import PropTypes from 'prop-types';

import {formatDate} from 'utils/date';
import {DRIVEWAY_QUANTITY_UNIT} from 'website/constants';

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
  <span>
    <b className="quote-line-approved-at-label">APPROVED AT: {formatDate(approvedAt)}</b>
  </span>
);

Approved.propTypes = {
  approvedAt: PropTypes.string,
};
