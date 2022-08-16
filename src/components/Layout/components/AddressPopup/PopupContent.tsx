import {AddressInput, Button} from '@ergeon/core-components';
import React, {useCallback, useMemo, useState} from 'react';
import {ReactSVG} from 'react-svg';

import {getCheckedZIP} from '../../../../api/lead';
import {PopUpAction} from './AddressPopup';
import {PopupContentProps} from './types';

const PopupContent = (props: PopupContentProps) => {
  const {
    actionType,
    addressInputLabel,
    disabled,
    handleAddressChange,
    handleAddressSelected,
    handleAddressSubmit,
    handleClose,
    product,
    icon,
    value,
  } = props;

  const [loading, setLoading] = useState(false);

  const submitText = useMemo(() => {
    switch (actionType) {
      case PopUpAction.Add:
        return 'Add';
      case PopUpAction.Edit:
        return 'Save';
      case PopUpAction.Remove:
        return 'Remove';
      default:
        return 'Update address';
    }
  }, [actionType]);

  const title = useMemo(() => {
    switch (actionType) {
      case PopUpAction.Add:
        return 'Add address';
      case PopUpAction.Edit:
        return 'Edit address';
      case PopUpAction.Remove:
        return 'Are you sure you want to remove this address?';
      default:
        return 'Update your address';
    }
  }, [actionType]);

  const submitFlavor = useMemo(() => {
    switch (actionType) {
      case PopUpAction.Remove:
        return 'attention';
      default:
        return 'primary';
    }
  }, [actionType]);

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
    <>
      <div className="Popup-header">
        {!!icon && <ReactSVG data-testid="popup-icon" src={icon} />}
        <h4>{title}</h4>
      </div>
      {actionType === PopUpAction.Remove ? (
        <span>This address will be removed from your Ergeon account and on-going campaigns.</span>
      ) : (
        <div data-test-id="address-input">
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
        </div>
      )}
      <hr className="Separator" />
      <div className="Buttons">
        <Button flavor="regular" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="submit-button"
          disabled={disabled || loading}
          flavor={disabled || loading ? 'regular' : submitFlavor}
          onClick={handleAddressSubmit}
        >
          {submitText}
        </Button>
      </div>
    </>
  );
};

export default PopupContent;
