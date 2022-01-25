import React from 'react';
import PropTypes from 'prop-types';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
import {indexLabel} from './utils';
import MapLabel from './MapLabel';

/**
 * Returns <MapLabel> as "label" with side wrapped in <h5>
 * @param {number} index
 * @param {string} label
 */
const SideTitle = (index, label) => (
  <>
    <MapLabel isInline={true} name={indexLabel(index, label)} type="Label" />
    <h5>Side {indexLabel(index, label)}</h5>
  </>
);

/**
 * Returns <MapLabel> as "circle"
 * @param {number} index
 * @param {string} label
 */
const PointTitle = (index, label) => (
  <>
    <MapLabel name={label ? label : index + 1} type="Circle" />
  </>
);

/**
 * Returns <MapLabel> as "LabelYellow" with label wrapped in <h5>
 * @param {number} index
 */
const AreaTitle = (index, label) => (
  <>
    <MapLabel name={indexLabel(index, label)} type="LabelYellow" />
    <h5>Area {indexLabel(index, label)}</h5>
  </>
);

/**
 * Renders side, gate or area titles, if none matches it returns null
 * @param {{type:string, index:number, label:string}} props
 */
export default function Title({type, index, label}) {
  const getTitle = () => {
    switch (type) {
      case CALC_SIDE_TYPE:
        return SideTitle(index, label);
      case CALC_GATE_TYPE:
        return PointTitle(index, label);
      case CALC_AREA_TYPE:
        return AreaTitle(index, label);
      default:
        return null;
    }
  };
  return <div className="quote-line__title spacing after__is-12">{getTitle()}</div>;
}

Title.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.oneOf([CALC_SIDE_TYPE, CALC_GATE_TYPE, CALC_AREA_TYPE]),
};
