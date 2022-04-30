import React, {useMemo} from 'react';
import {getFormattedAddress} from '../../utils/app-house';
import AppSubCard from '../common/AppSubCard';
import DataRow from '../common/DataRow';
import HouseMap from './HouseMap';
import {HouseType} from '../types';

const HouseCard = ({house, houseNumber} : {house: HouseType, houseNumber: number}) => {

  const houseContent = useMemo(() => {
    return (
      <div className="flex-wrapper">
        <div>
          <DataRow title="Address" value={getFormattedAddress(house)} />
        </div>
        {house.address && <HouseMap address={house.address}/>}
      </div>
    );
  }, [house])

  return (
    <AppSubCard
      renderContent={() => houseContent}
      renderHeader={() => `House #${houseNumber}`}
    />
  )
}

export default HouseCard;
