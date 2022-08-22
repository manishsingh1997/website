import React from 'react';

import PropTypes, {oneOfType} from 'prop-types';

import {MAP_LABEL_TYPE, MAP_LABEL_YELLOW_TYPE, MAP_CIRCLE_TYPE} from 'website/constants';

import './MapLabel.scss';

export default class MapLabel extends React.Component {
  static propTypes = {
    isInline: PropTypes.bool,
    name: oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf([MAP_LABEL_TYPE, MAP_LABEL_YELLOW_TYPE, MAP_CIRCLE_TYPE]),
  };

  render() {
    const {isInline, type, name} = this.props;

    const labelClasses = {
      [MAP_LABEL_TYPE]: 'map-label',
      [MAP_LABEL_YELLOW_TYPE]: 'map-label-yellow',
      [MAP_CIRCLE_TYPE]: 'map-circle',
    };
    const className = labelClasses[type];

    if (isInline) {
      return <span className={className}>{name}</span>;
    }
    return <div className={className}>{name}</div>;
  }
}
