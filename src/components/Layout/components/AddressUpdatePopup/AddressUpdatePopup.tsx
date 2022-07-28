import React, {FC, useCallback} from 'react';

import {trackAddressEntered} from '../../../../utils/analytics';
import {updateLeadWithZipcode} from '../../utils';
import {Lead, Product} from '../../../types';

import AddressPopup from '../AddressPopup';

export interface AddressUpdatePopupProps {
  open: boolean;
  product: Product;
  value?: string;
  lead?: Lead;
  closeAddressUpdatePopup: () => void;
  updateLead: (lead: Lead) => void;
  updateModalLead: (lead: Lead) => void;
  updateModalValue: (lead: Lead) => void;
}

const AddressUpdatePopup: FC<AddressUpdatePopupProps> = (props) => {
  const {closeAddressUpdatePopup, lead, open, product, updateLead, updateModalLead, updateModalValue, value} = props;

  const handleAddressSelected = useCallback(
    (newLead) => {
      const updatedLead = updateLeadWithZipcode(newLead);
      updateModalLead(updatedLead);
    },
    [updateModalLead]
  );

  const handleAddressChange = useCallback(
    (newValue) => {
      updateModalValue(newValue);
    },
    [updateModalValue]
  );

  const handleAddressSubmit = useCallback(() => {
    if (!lead) return;
    trackAddressEntered(lead);
    updateLead(lead);
  }, [lead, updateLead]);

  const handleClose = useCallback(() => {
    closeAddressUpdatePopup();
  }, [closeAddressUpdatePopup]);

  if (!open) {
    return null;
  }

  return (
    <AddressPopup
      disabled={!lead}
      handleAddressChange={handleAddressChange}
      handleAddressSelected={handleAddressSelected}
      handleAddressSubmit={handleAddressSubmit}
      handleClose={handleClose}
      product={product}
      submitText={'Update Address'}
      title={'Update your address'}
      value={value}
    />
  );
};

export default AddressUpdatePopup;
