import React from 'react';
import {ReactSVG} from 'react-svg';
import ErrorIcon from '@ergeon/core-components/src/assets/icon-error.svg';
import {Button} from '@ergeon/core-components';

import './ErroredLoadingModal.scss';

interface LoadingErrorModalProps {
	onClose: () => void;
}

const LoadingErrorModal = ({onClose}: LoadingErrorModalProps) => {
  return (
    <div className="loading-error-modal">
      <ReactSVG className="error-icon" src={ErrorIcon} />
      <p className="loading-error-modal__heading">Server is not responding</p>
      <p className="loading-error-modal__error-text">Sorry, something went wrong.</p>
      <p className="loading-error-modal__error-text">We already notified about it.</p>
      <Button className="loading-error-modal__close-button" flavor="regular" onClick={() => onClose()}>Cancel</Button>
    </div>
  );
};

export default LoadingErrorModal;
