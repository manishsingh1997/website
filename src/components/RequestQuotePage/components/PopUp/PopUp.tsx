import React, {ReactNode, useEffect} from 'react';

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

const PopUp = (props: PopUpProps) => {
  const {className = '', children, onHide, visible = false} = props;

  useEffect(
    function onUpdate() {
      if (visible) {
        scrollTop();
        blockBodyScroll();
      } else {
        unblockBodyScroll();
      }

      return () => {
        unblockBodyScroll();
      };
    },
    [visible]
  );

  const popupClasses = classNames({
    popup__container: true,
    [className]: className,
  });

  if (visible) {
    return (
      <>
        <div className={popupClasses} data-testid="popup-modal">
          <div className="popup__wrapper">
            <div className="popup__cross-icon" onClick={() => onHide && onHide()}>
              <ReactSVG src={crossIcon} />
            </div>
            <div className="popup__content">{children}</div>
          </div>
        </div>
        <div className="popup__fog" onClick={() => onHide && onHide()} />
      </>
    );
  }

  return null;
};

export default PopUp;
