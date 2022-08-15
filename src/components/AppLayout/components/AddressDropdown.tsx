import React, {useCallback, useMemo, useState} from 'react';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import AddIcon from '@ergeon/core-components/src/assets/icon-add.svg';

import {AddAddressProps} from '../../AppHouseListPage/types';
import {HouseType} from '../../types';
import {getStreetFromAddress} from '../../../utils/app-house';
import AddAddressPopup from './AddAddressPopup';

import './AddressDropdown.scss';

export type AddressDropdownProps = {
  houses: HouseType[] | null;
  selectedHouse: HouseType | null;
  customerGID?: number;
  addHouse: (customerGID: number, address: AddAddressProps) => void;
  setSelectedHouse: (data: HouseType) => void;
};

const AddressDropdown = (props: AddressDropdownProps) => {
  const {houses, selectedHouse, addHouse, setSelectedHouse, customerGID} = props;

  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = useCallback(() => {
    setShowOptions((prevValue) => !prevValue);
  }, []);

  const onListItemClick = useCallback(
    (item: HouseType) => {
      if (item.id != selectedHouse?.id) {
        setSelectedHouse(item);
      }
      toggleShowOptions();
    },
    [toggleShowOptions, selectedHouse]
  );

  const getHouseAddressStreet = useCallback((house?: HouseType) => {
    if (!house) {
      return '';
    }

    const [street] = getStreetFromAddress(house);

    if (!street) {
      return '';
    }

    return street;
  }, []);

  const onAddressPopupClose = useCallback(() => {
    setIsAddressPopupOpen(false);
  }, []);

  const onAddAddressClick = useCallback(() => {
    setIsAddressPopupOpen(true);
  }, []);

  const renderHouseAddress = useCallback(
    (item: HouseType, index: number) => {
      const street = getHouseAddressStreet(item);

      return (
        <li
          className={'siblings-list-item'}
          data-testid={`item-${item.id}`}
          key={`item-${item.id ?? index}`}
          onClick={() => onListItemClick(item)}
        >
          <div className="siblings-list-item__wrapper">{street}</div>
        </li>
      );
    },
    [getHouseAddressStreet]
  );

  const addressOptions = useMemo(() => {
    return (
      <div className={'AddressDropdown-options card soft-border'}>
        <ul className="siblings-list">
          {houses?.map(renderHouseAddress)}
          <li className={'siblings-list-item'} data-testid={'item-add-address'} onClick={onAddAddressClick}>
            <ReactSVG className="add-icon spacing right__is-5" src={AddIcon} />
            <div className="siblings-list-item__wrapper">{'Add new address'}</div>
          </li>
        </ul>
      </div>
    );
  }, [houses, onAddAddressClick, renderHouseAddress]);

  const dropdownMenuClassName = useMemo(() => {
    return classNames('dropdown-menu--icon', {
      'opened-dropdown-menu--icon': showOptions,
    });
  }, [showOptions]);

  const selectedAddressStreet = useMemo(() => {
    if (selectedHouse) {
      return getHouseAddressStreet(selectedHouse);
    }
    return '';
  }, [selectedHouse]);

  const title = useMemo(() => {
    if (selectedHouse) {
      return (
        <div
          className="AddressDropdown-title SideBar-Header"
          data-testid={'dropdown-title'}
          onClick={toggleShowOptions}
        >
          <p>{selectedAddressStreet}</p>
          <i className={dropdownMenuClassName} />
        </div>
      );
    }
  }, [selectedHouse, selectedAddressStreet, dropdownMenuClassName]);

  return (
    <div className="AddressDropdown">
      {title}
      {showOptions && addressOptions}
      <AddAddressPopup
        addHouse={addHouse}
        customerGID={customerGID}
        isOpen={isAddressPopupOpen}
        onClose={onAddressPopupClose}
      />
    </div>
  );
};

export default AddressDropdown;
