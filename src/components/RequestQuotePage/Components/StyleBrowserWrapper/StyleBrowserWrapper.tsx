import React, {useEffect, useState} from 'react';
import {constants, StyleBrowser} from '@ergeon/3d-lib';
// @ts-ignore
import {tawk} from '@ergeon/erg-utms';
import PopUp from '../PopUp';
import './StyleBrowserWrapper.scss';

type StyleBrowserWrapperProps = {
  doneButtonText: string;
  initialSchemaCode?: string;
  onClose: () => void;
  onDone: (model: string) => void;
  onLoaded: () => void;
  showLoadingError: () => void;
  zipcode: string;
};

const StyleBrowserWrapper = (props: StyleBrowserWrapperProps) => {
  const {zipcode, onLoaded, onDone, onClose, initialSchemaCode, doneButtonText} = props;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(function onMount() {
    // @ts-ignore
    tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.hideWidget());
    setShowPopup(true);
    onLoaded();

    return () => {
      // @ts-ignore
      tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.showWidget());
    }
  }, []);

  const handleSelectionCompleted = (model: string) => {
    onDone && onDone(model);
  };

  const closePopup = () => {
    onClose();
    setShowPopup(false);
  };

  return (
    <div className="style-browser-wrapper">
      <PopUp onHide={closePopup} visible={showPopup}>
        <div>
          <div className="style-browser-wrapper__title" data-testid="style-browser">
            <span className="label uppercase">Design your Fence or Gate</span>
          </div>
          <StyleBrowser
            doneButtonText={doneButtonText}
            model={initialSchemaCode ?? constants.defaultFenceCode}
            onComplete={(model) => handleSelectionCompleted(model)}
            shouldUpdateUrl={false}
            zipcode={zipcode}
          />
        </div>
      </PopUp>
    </div>
  );
};

export default StyleBrowserWrapper;
