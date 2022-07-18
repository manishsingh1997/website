import React, {ReactNode} from 'react';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';
import {blockBodyScroll, unblockBodyScroll, scrollTop} from '@ergeon/core-components';
import crossIcon from '@ergeon/core-components/src/assets/icon-cross-gray.svg';
import './PopUp.scss';

type PopUpProps = {
  children?: ReactNode;
  className?: string;
  onHide: () => void;
  visible?: boolean;
};

export default class PopUp extends React.Component<PopUpProps> {
  componentDidUpdate(prevProps: PopUpProps) {
    const {visible} = this.props;
    if (!prevProps.visible && visible) {
      scrollTop();
      blockBodyScroll();
    } else {
      unblockBodyScroll();
    }
  }

  componentWillUnmount() {
    unblockBodyScroll();
  }

  render() {
    const {className = '', children, onHide, visible = false} = this.props;
    const popupClasses = classNames({
      popup__container: true,
      [className]: className,
    });

    return (
      <React.Fragment>
        {visible && (
          <React.Fragment>
            <div className={popupClasses} data-testid="popup-modal">
              <div className="popup__wrapper">
                <div className="popup__cross-icon" onClick={() => onHide && onHide()}>
                  <ReactSVG src={crossIcon} />
                </div>
                <div className="popup__content">{children}</div>
              </div>
            </div>
            <div className="popup__fog" onClick={() => onHide && onHide()} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
