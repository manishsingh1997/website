import React, {useState, useCallback} from 'react';

import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';

import AddressPopup from '../../Layout/components/AddressPopup';
import {PopUpAction} from '../../Layout/components/AddressPopup/AddressPopup';
import {Address} from '../../types';
import {parseAddressData} from '../../AppHouseListPage/utils';
import {AddAddressProps} from '../../AppHouseListPage/types';

type AddAddressPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  customerGID?: number;
  addHouse: (customerGID: number, address: AddAddressProps) => void;
};

const AddAddressPopup = (props: AddAddressPopupProps) => {
  const {isOpen, customerGID, onClose, addHouse} = props;

  const [isDisabled, setIsDisabled] = useState(true);
  const [addressData, setAddressData] = useState<AddAddressProps | null>(null);

  const onPopupClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onAddressChange = useCallback(() => {
    setIsDisabled(true);
  }, []);

  const onAddressSelected = useCallback((data: {address: Address}) => {
    const newData = parseAddressData(data);
    if (newData) {
      setIsDisabled(false);
    }
    setAddressData(newData);
  }, []);

  const onAddressSubmit = useCallback(() => {
    if (customerGID && addressData) {
      addHouse(customerGID, addressData);
      onClose();
    }
  }, [addHouse, onClose, customerGID, addressData]);

  if (!isOpen) {
    return null;
  }

  return (
    <AddressPopup
      actionType={PopUpAction.Add}
      addressInputLabel={'Street address'}
      disabled={isDisabled}
      handleAddressChange={onAddressChange}
      handleAddressSelected={onAddressSelected}
      handleAddressSubmit={onAddressSubmit}
      handleClose={onPopupClose}
      icon={locationIcon}
    />
  );
};

export default AddAddressPopup;
