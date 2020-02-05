import React from 'react';
import PropTypes from 'prop-types';

import './Notice.scss';

export default class Notice extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="notice notice-info">
        {this.props.children}
      </div>
    );
  }
}
