import React, {useCallback, useState} from 'react';
import {Portal} from 'react-portal';
import {AddressInput, Button} from '@ergeon/core-components';
import {ReactSVG} from 'react-svg';

import {getCheckedZIP} from '../../../../api/lead';
import {AddressPopupProps} from './types';

import './AddressPopup.scss';

const AddressPopup = (props: AddressPopupProps) => {
  const {
    addressInputLabel,
    disabled,
    handleAddressChange,
    handleAddressSelected,
    handleAddressSubmit,
    handleClose,
    product,
    submitText,
    icon,
    title,
    value,
  } = props;

  const [loading, setLoading] = useState(false);

  const onLoadStarts = useCallback(
    (place) => {
      setLoading(true);
      !!handleAddressChange && handleAddressChange(place['formated_address']);
    },
    [handleAddressChange]
  );

  const onLoadEnds = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Portal>
      <div className="Popup address-popup">
        <div className="Popup-overlay" onClick={handleClose} />
        <div className="Popup-content">
          <div className="Popup-header">
            {!!icon && <ReactSVG data-testid="popup-icon" src={icon} />}
            <h4>{title}</h4>
          </div>
          <AddressInput
            getCheckedZIP={getCheckedZIP}
            inputLabel={addressInputLabel}
            loading={loading}
            onChange={handleAddressChange}
            onLoadEnds={onLoadEnds}
            onLoadStarts={onLoadStarts}
            onSubmit={handleAddressSelected}
            product={product}
            value={value}
          />
          <hr className="Separator" />
          <div className="Buttons">
            <Button flavor="regular" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="submit-button"
              disabled={disabled || loading}
              flavor={disabled || loading ? 'regular' : 'primary'}
              onClick={handleAddressSubmit}
            >
              {submitText}
            </Button>
          </div>
          <div className="Popup-close" data-testid="close-icon-id" onClick={handleClose}>
            ×
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AddressPopup;
