import React from 'react';
import PropTypes from 'prop-types';

import {isChristmasTime, scrollTop} from 'utils/utils';

import christmasSparkles from '../../assets/christmas-pics/sparkles.png';
import './Success.scss';

class Success extends React.Component {
  static propTypes = {
    header: PropTypes.string,
    scrollOnMount: PropTypes.bool,
    text: PropTypes.string,
  };

  static defaultProps = {
    scrollOnMount: true,
  };

  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
  }

  componentDidMount() {
    if (this.props.scrollOnMount) {
      scrollTop();
    }
  }

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
        {this.isChristmasTime && (
          <div className="center spacing before__is-12">
            <img className="christmas-sparkles" src={christmasSparkles} />
          </div>
        )}
      </div>
    );
  }
}

export default Success;
