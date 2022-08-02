import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import {showUpcomingFeatures} from '../../utils/utils';
import AddressPopup from '../Layout/components/AddressPopup';

import {Address, HouseType} from '../types';
import {PopUpAction} from '../Layout/components/AddressPopup/AddressPopup';
import {AppHouseListPageProps, AddAddressProps} from './types';
import PageContent from './PageContent';
import PageHeader from './PageHeader';
import {getInitalAddress, parseAddressData} from './utils';

import './index.scss';

const AppHouseListPage = (props: AppHouseListPageProps) => {
  const {
    getHouses,
    addHouse,
    editHouse,
    removeHouse,
    houses,
    listError,
    isListLoading,
    isPopupOpen,
    isSuccessfullyRemoved,
  } = props;

  const customerGID = useContext(CustomerGIDContext);

  const [isOpen, setIsOpen] = useState(isPopupOpen);
  const [isDisabled, setIsDisabled] = useState(true);
  const [addressPopupSubmitAction, setAddressPopupSubmitAction] = useState<PopUpAction>(PopUpAction.Add);
  const [addressData, setAddressData] = useState<AddAddressProps | null>();
  const [selectedHouse, setSelectedHouse] = useState<HouseType | null>(null);

  useEffect(
    function checkPopup() {
      setIsOpen(isPopupOpen);
    },
    [isPopupOpen]
  );

  useEffect(
    function checkSuccessfullyRemoved() {
      if (isSuccessfullyRemoved) {
        setAddressPopupSubmitAction(PopUpAction.Confirmation);
      }
    },
    [isSuccessfullyRemoved]
  );

  const confirmationMessage = useMemo(() => {
    if (selectedHouse) {
      const address = getInitalAddress(selectedHouse);
      return (
        <span>
          The address <b>{address}</b> has been removed.
        </span>
      );
    }
  }, [selectedHouse]);

  const fetchData = useCallback(() => {
    getHouses(customerGID);
  }, [customerGID]);

  const onOpenAddHouseAddressPopup = () => {
    setSelectedHouse(null);
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Add);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenEditHouseAddressPopup = (house: HouseType) => {
    setSelectedHouse(house);
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Edit);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenRemoveHouseAddressPopup = (house: HouseType) => {
    setSelectedHouse(house);
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Remove);
    setIsOpen(true);
    setIsDisabled(false);
  };

  const handleSubmitAddress = useCallback(() => {
    switch (addressPopupSubmitAction) {
      case PopUpAction.Edit:
        return editHouse(customerGID, selectedHouse?.id as unknown as string, addressData as AddAddressProps);
      case PopUpAction.Remove:
        return removeHouse(customerGID, selectedHouse?.id as unknown as string);
      case PopUpAction.Add:
        return addHouse(customerGID, addressData as AddAddressProps);
      default:
        throw new Error(`Invalid PopUpAction: "${PopUpAction[addressPopupSubmitAction]}"`);
    }
  }, [addressPopupSubmitAction, addressData, selectedHouse, customerGID]);

  const handleAddressSelect = (data: {address: Address}) => {
    const newData = parseAddressData(data);
    if (newData) {
      setIsDisabled(false);
    }
    setAddressData(newData);
  };

  const handleDisable = () => {
    setIsDisabled(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedHouse(null);
  };

  const renderContent = useCallback(() => {
    return (
      <PageContent houses={houses} onEdit={onOpenEditHouseAddressPopup} onRemove={onOpenRemoveHouseAddressPopup} />
    );
  }, [houses, onOpenEditHouseAddressPopup, onOpenRemoveHouseAddressPopup]);

  const renderHeader = useCallback(() => {
    return <PageHeader onAdd={onOpenAddHouseAddressPopup} />;
  }, [showUpcomingFeatures]);

  return (
    <>
      <AppPage
        className="house-list-page"
        error={listError}
        fetchData={fetchData}
        isLoading={isListLoading}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
      {isOpen && (
        <AddressPopup
          actionType={addressPopupSubmitAction}
          addressInputLabel={'Street address'}
          confirmationMessage={confirmationMessage}
          disabled={isDisabled}
          handleAddressChange={handleDisable}
          handleAddressSelected={handleAddressSelect}
          handleAddressSubmit={handleSubmitAddress}
          handleClose={handleClose}
          icon={addressPopupSubmitAction !== PopUpAction.Remove && locationIcon}
        />
      )}
    </>
  );
};

export default AppHouseListPage;
