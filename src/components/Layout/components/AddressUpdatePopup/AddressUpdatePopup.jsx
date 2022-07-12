import React, {useState, useCallback} from 'react';
import {Portal} from 'react-portal';

import {AddressInput, Button} from '@ergeon/core-components';

import {getCheckedZIP} from 'api/lead';
import {trackAddressEntered} from 'utils/analytics';
import {updateLeadWithZipcode} from '../../utils';

import './AddressUpdatePopup.scss';

const AddressUpdatePopup = (props) => {
  const {closeAddressUpdatePopup, lead, open, product, updateLead, updateModalLead, updateModalValue, value} = props;

  const [loading, setLoading] = useState(false);

  const handleAddressSelected = useCallback((newLead) => {
    const updatedLead = updateLeadWithZipcode(newLead);
    updateModalLead(updatedLead);
  }, [updateModalLead]);

  const handleAddressChange = useCallback((newValue) => {
    updateModalValue(newValue);
  }, [updateModalValue]);

  const handleAddressSubmit = useCallback(() => {
    if (!lead) return;
    trackAddressEntered(lead);
    updateLead(lead);
  }, [lead, updateLead]);

  const handleClose = useCallback(() => {
    closeAddressUpdatePopup();
  }, [closeAddressUpdatePopup]);

  const onLoadStarts = useCallback(
    (place) => {
      setLoading(true);
      handleAddressChange(place['formated_address']);
    },
    [handleAddressChange]
  );

  const onLoadEnds = useCallback(() => {
    setLoading(false);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Portal into="body">
      <div className="Popup address-update-popup">
        <div className="Popup-overlay" onClick={handleClose} />
        <div className="Popup-content">
          <h4>Update your address</h4>
          <AddressInput
            getCheckedZIP={getCheckedZIP}
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
              disabled={!lead || loading}
              flavor={!lead || loading ? 'regular' : 'primary'}
              onClick={handleAddressSubmit}
            >
              Update Address
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

export default AddressUpdatePopup;
