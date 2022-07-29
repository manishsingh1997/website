import React from 'react';
import {Portal} from 'react-portal';

import {AddressPopupProps} from './types';

import './AddressPopup.scss';
import Confirmation from './Confirmation';
import PopupContent from './PopupContent';

export enum PopUpAction {
  Add,
  Confirmation,
  Edit,
  Remove,
  LeadUpdate,
}

const AddressPopup = (props: AddressPopupProps) => {
  const {
    actionType,
    addressInputLabel,
    confirmationMessage,
    disabled,
    handleAddressChange,
    handleAddressSelected,
    handleAddressSubmit,
    handleClose,
    icon,
    product,
    value,
  } = props;

  return (
    <Portal>
      <div className="Popup address-popup">
        <div className="Popup-overlay" onClick={handleClose} />
        <div className="Popup-content">
          {actionType === PopUpAction.Confirmation && <Confirmation message={confirmationMessage} />}
          {actionType !== PopUpAction.Confirmation && (
            <PopupContent
              actionType={actionType}
              addressInputLabel={addressInputLabel}
              disabled={disabled}
              handleAddressChange={handleAddressChange}
              handleAddressSelected={handleAddressSelected}
              handleAddressSubmit={handleAddressSubmit}
              handleClose={handleClose}
              icon={icon}
              product={product}
              value={value}
            />
          )}
          <div className="Popup-close" data-testid="close-icon-id" onClick={handleClose}>
            ×
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AddressPopup;
