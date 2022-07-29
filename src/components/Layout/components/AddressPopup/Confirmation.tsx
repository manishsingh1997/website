import React from 'react';
import {ReactSVG} from 'react-svg';
import locationIcon from '@ergeon/core-components/src/assets/icon-confirmation-check.svg';

import {ConfirmationProps} from './types';

import './Confirmation.scss';

const Confirmation = (props: ConfirmationProps) => {
  const {message} = props;
  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-head">
        <ReactSVG data-testid="popup-icon" src={locationIcon} />
      </div>
      <div className="confirmation-body">{message}</div>
    </div>
  );
};

export default Confirmation;
