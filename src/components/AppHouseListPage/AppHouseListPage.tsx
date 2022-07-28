import React, {useCallback, useContext, useEffect, useState} from 'react';
import locationIcon from '@ergeon/core-components/src/assets/location-icon.svg';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import {showUpcomingFeatures} from '../../utils/utils';
import AddressPopup from '../Layout/components/AddressPopup';

import {Address} from '../types';
import {AppHouseListPageProps, AddAddressProps} from './types';
import PageContent from './PageContent';
import PageHeader from './PageHeader';
import {parseAddressData} from './utils';

import './index.scss';

enum PopUpAction {
  Add,
  Edit,
}

const AppHouseListPage = (props: AppHouseListPageProps) => {
  const {getHouses, addHouse, houses, listError, isListLoading, isPopupOpen} = props;

  const customerGID = useContext(CustomerGIDContext);

  const [isOpen, setIsOpen] = useState(isPopupOpen);
  const [isDisabled, setIsDisabled] = useState(true);
  const [addressPopupSubmitText, setAddressPopupSubmitText] = useState('');
  const [addressPopupSubmitAction, setAddressPopupSubmitAction] = useState<PopUpAction>(PopUpAction.Add);
  const [addressPopupTitle, setAddressPopupTitle] = useState('');
  const [addressData, setAddressData] = useState<AddAddressProps | null>();

  useEffect(() => setIsOpen(isPopupOpen), [isPopupOpen]);

  const fetchData = useCallback(() => {
    getHouses(customerGID);
  }, [customerGID]);

  const onOpenAddHouseAddressPopup = () => {
    setAddressData(null);
    setAddressPopupSubmitText('Add');
    setAddressPopupTitle('Add address');
    setAddressPopupSubmitAction(PopUpAction.Add);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenEditHouseAddressPopup = () => {
    setAddressData(null);
    setAddressPopupSubmitText('Save');
    setAddressPopupTitle('Edit address');
    setAddressPopupSubmitAction(PopUpAction.Edit);
    setIsOpen(true);
    setIsDisabled(true);
  };

  const onOpenRemoveHouseAddressPopup = () => {
    // Upcoming feature: ENG-16280
    alert('Next feature');
  };

  const handleSubmitAddress = useCallback(() => {
    switch (addressPopupSubmitAction) {
      case PopUpAction.Edit:
        // Upcoming feature: ENG-16282
        alert('Next feature');
        break;
      case PopUpAction.Add:
      default:
        addHouse(customerGID, addressData as AddAddressProps);
    }
  }, [addressData, customerGID]);

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
          addressInputLabel={'Street address'}
          disabled={isDisabled}
          handleAddressChange={() => setIsDisabled(true)}
          handleAddressSelected={(data: {address: Address}) => handleAddressSelect(data)}
          handleAddressSubmit={() => handleSubmitAddress()}
          handleClose={() => setIsOpen(false)}
          icon={locationIcon}
          submitText={addressPopupSubmitText}
          title={addressPopupTitle}
        />
      )}
    </>
  );
};

export default AppHouseListPage;
