import React, {useCallback} from 'react';
import {Button} from '@ergeon/core-components';
import {getStreetFromAddress} from '../../utils/app-house';
import HouseMap from './HouseMap';
import {HouseCardProps} from './types';

import './HouseCard.scss';

const HouseCard = (props: HouseCardProps) => {
  const {house, onEdit, onRemove} = props;

  const renderContent = useCallback(() => {
    if (house?.has_active_order) {
      return (
        <div className="active-content">
          <i>Address currently has active project.</i>
        </div>
      );
    }
    return (
      <div className="inactive-content">
        <Button flavor="regular" onClick={() => onEdit(house)} size="small">
          Edit
        </Button>
        <Button flavor="attention" onClick={() => onRemove(house)} size="small" taste="line">
          Remove
        </Button>
      </div>
    );
  }, [house, onEdit, onRemove]);

  const renderHeader = useCallback(() => {
    if (!house) {
      return null;
    }

    const [street, finalAddress] = getStreetFromAddress(house);

    return (
      <>
        <h5>{street}</h5>
        <h6>{finalAddress}</h6>
      </>
    );
  }, [house]);

  return (
    <div className="flex-wrapper house-address-wrapper">
      <div className="house-address-container">
        {renderHeader()}
        {renderContent()}
      </div>
      {house.address && <HouseMap address={house.address} />}
    </div>
  );
};

export default HouseCard;
