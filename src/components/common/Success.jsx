import React from 'react';
import PropTypes from 'prop-types';

import './Success.scss';

class Success extends React.Component {

  static propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const {header, text} = this.props;
    return (
      <div className="success-wrapper">
        <div className="success">
          <div className="success-line success-line-long" />
          <div className="success-line success-line-tip" />
          <div className="success-ring" />
          <div className="success-hide-corners" />
        </div>
        <h4 className="center spacing after__is-12">{header}</h4>
        <p className="subheader h4 center">{text}</p>
      </div>
    );
  }
}

export default Success;
