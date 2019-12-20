import React from 'react';
import PropTypes from 'prop-types';

import christmasSparkles from '../../assets/christmas-pics/sparkles.png';
import './Success.scss';

class Success extends React.Component {

  static propTypes = {
    header: PropTypes.string,
    isChristmasTime: PropTypes.bool,
    text: PropTypes.string,
  };

  render() {
    const {header, isChristmasTime, text} = this.props;
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
        {isChristmasTime && (
          <div className="center spacing before__is-12">
            <img className="christmas-sparkles" src={christmasSparkles} />
          </div>
        )}
      </div>
    );
  }
}

export default Success;
