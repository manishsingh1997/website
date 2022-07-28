import React, {useCallback, useContext, useEffect, useState} from 'react';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import {showUpcomingFeatures} from '../../utils/utils';
import AddressPopup from '../Layout/components/AddressPopup';

import {Address} from '../types';
import {PopUpAction} from '../Layout/components/AddressPopup/AddressPopup';
import {AppHouseListPageProps, AddAddressProps} from './types';
import PageContent from './PageContent';
import PageHeader from './PageHeader';
import {parseAddressData} from './utils';

import './index.scss';

const AppHouseListPage = (props: AppHouseListPageProps) => {
  const {getHouses, addHouse, houses, listError, isListLoading, isPopupOpen} = props;

  const customerGID = useContext(CustomerGIDContext);

  const [isOpen, setIsOpen] = useState(isPopupOpen);
  const [isDisabled, setIsDisabled] = useState(true);
  const [addressPopupSubmitAction, setAddressPopupSubmitAction] = useState<PopUpAction>(PopUpAction.Add);
  const [addressData, setAddressData] = useState<AddAddressProps | null>();

  useEffect(() => setIsOpen(isPopupOpen), [isPopupOpen]);

  const fetchData = useCallback(() => {
    getHouses(customerGID);
  }, [customerGID]);

  const onOpenAddHouseAddressPopup = () => {
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Add);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenEditHouseAddressPopup = () => {
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Edit);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenRemoveHouseAddressPopup = () => {
    setAddressData(null);
    setAddressPopupSubmitAction(PopUpAction.Remove);
    setIsOpen(true);
    setIsDisabled(false);
  };

  const handleSubmitAddress = useCallback(() => {
    switch (addressPopupSubmitAction) {
      case PopUpAction.Edit:
        // Upcoming feature: ENG-16282
        alert('Next feature');
        break;
      case PopUpAction.Remove:
        // Upcoming feature: ENG-16282
        alert('Next feature');
        break;
      case PopUpAction.Add:
      default:
        addHouse(customerGID, addressData as AddAddressProps);
    }
  }, [addressPopupSubmitAction, addressData, customerGID]);

  const handleAddressSelect = (data: {address: Address}) => {
    const newData = parseAddressData(data);
    if (newData) {
      setIsDisabled(false);
    }
    setAddressData(newData);
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
          disabled={isDisabled}
          handleAddressChange={() => setIsDisabled(true)}
          handleAddressSelected={(data: {address: Address}) => handleAddressSelect(data)}
          handleAddressSubmit={() => handleSubmitAddress()}
          handleClose={() => setIsOpen(false)}
          icon={addressPopupSubmitAction !== PopUpAction.Remove && locationIcon}
        />
      )}
    </>
  );
};

export default AppHouseListPage;
