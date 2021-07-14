import React from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
import {indexLabel} from './utils';
import MapLabel from '../MapLabel';

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
 * @param {string} name
 */
const PointTitle = (index, label, name) => (
  <>
    <MapLabel name={label ? label : index + 1} type="Circle" />
    <h5>{name}</h5>
  </>
);

/**
 * Returns <MapLabel> as "LabelYellow" with label wrapped in <h5>
 * @param {number} index
 */
const AreaTitle = (index) => (
  <>
    <MapLabel name={getLabelFromIndex(index)} type="LabelYellow" />
    <h5>Area {getLabelFromIndex(index)}</h5>
  </>
);

/**
 * Renders side, gate or area titles, if none matches it returns null
 * @param {{type:string, index:number, label:string, name:string}} props
 */
export default function Title({type, index, label, name}) {
  const getTitle = () => {
    switch (type) {
      case CALC_SIDE_TYPE:
        return SideTitle(index, label);
      case CALC_GATE_TYPE:
        return PointTitle(index, label, name);
      case CALC_AREA_TYPE:
        return AreaTitle(index);
      default:
        return null;
    }
  };
  return <div className="quote-line__title spacing after__is-12">{getTitle()}</div>;
}

Title.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf([CALC_SIDE_TYPE, CALC_GATE_TYPE, CALC_AREA_TYPE]),
};
