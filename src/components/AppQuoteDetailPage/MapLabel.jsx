import React from 'react';
import PropTypes from 'prop-types';

import './MapLabel.scss';

export default class MapLabel extends React.Component {

  static propTypes = {
    isInline: PropTypes.bool,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Label', 'LabelYellow', 'Circle']),
  };

  render() {
    const {isInline, type, name} = this.props;

    const labelClasses = {
      'Label': 'map-label',
      'LabelYellow': 'map-label-yellow',
      'Circle': 'map-circle',
    };
    const className = labelClasses[type];

    if (isInline) {
      return <span className={className}>{name}</span>;
    }
    return <div className={className}>{name}</div>;
  }
}
