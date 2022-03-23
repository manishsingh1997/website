import React from 'react';
import propTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';
import crossIcon from '@ergeon/core-components/src/assets/icon-cross-gray.svg';
import './PopUp.scss';

export default class PopUp extends React.Component {
  static propTypes = {
    children: propTypes.node,
    className: propTypes.string,
    onHide: propTypes.func,
    visible: propTypes.bool,
  };
  // eslint-disable-next-line no-undef
  static defaultProps = {
    visible: false,
  };

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'unset';
  }

  render() {
    const {className} = this.props;
    const {visible} = this.props;
    const popupClasses = classNames({
      'popup__container': true,
      [className]: className,
    });
    const {children, onHide} = this.props;
    if (visible) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    }
    return (
      <React.Fragment>
        {visible &&
        <React.Fragment>
          <div className={popupClasses}>
            <div className="popup__wrapper">
              <div className="popup__cross-icon" onClick={() => onHide && onHide()}><ReactSVG src={crossIcon}/></div>
              <div className="popup__content">
                {children}
              </div>
            </div>
          </div>
          <div className="popup__fog" onClick={() => onHide && onHide()}/>
        </React.Fragment>}
      </React.Fragment>
    );
  }
}
