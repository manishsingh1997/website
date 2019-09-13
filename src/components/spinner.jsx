import './spinner.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class Spinner extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
  };
  constructor(props) {
    super();
    this.state = {
      borderWidth: props.borderWidth || 0.16,
      color: props.color || 'white',
      size: props.size || 16,
    };
  }
  renderLoaderLines() {
    const {borderWidth, size} = this.state;
    let lines = [];
    for (let i = 0; i < 3; i++) {
      lines.push(
        <div
          key={i}
          style={{
            borderWidth: `${Math.round(size * borderWidth)}px`,
            width: `${Math.round(size * (1 - borderWidth))}px`,
            height: `${Math.round(size * (1 - borderWidth))}px`,
            margin: `${Math.round(size * borderWidth)}px`,
          }}>
        </div>
      );
    }
    return lines;
  }
  render() {
    const {active} = this.props;
    const {color, size} = this.state;
    const loaderClasses = ClassNames({
      'loader': true,
      'green': color === 'green',
      'white': color === 'white',
    });
    if (active) {
      return (
        <div className="loaderWrapper" style={{width: `${size}px`, height: `${size}px`}}>
          <div className={loaderClasses}>
            {this.renderLoaderLines()}
          </div>
        </div>
      );
    }
    return null;
  }
}
export default Spinner;
