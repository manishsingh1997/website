import React, {useCallback, useContext} from 'react';
import {Notification, Button} from '@ergeon/core-components';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../../components/common/AppPage';
import {showUpcomingFeatures} from '../../utils/utils';
import HouseCard from './HouseCard';

import {AppHouseListPageProps} from './types';
import {handleAddHouseAddress, handleEditHouseAddress, handleRemoveHouseAddress} from './utils';
import './index.scss';

const AppHouseListPage = (props: AppHouseListPageProps) => {
  const {getHouses, houses, listError, isListLoading} = props;

  const customerGID = useContext(CustomerGIDContext);

  const fetchData = useCallback(() => {
    getHouses(customerGID);
  }, [customerGID]);

  const onAddHouseAddress = useCallback(() => handleAddHouseAddress(), [handleAddHouseAddress]);

  const renderContent = useCallback(() => {
    const isEmptyHouseList = !houses || houses.length === 0;
    if (isEmptyHouseList) {
      return (
        <Notification mode="embed" type="Information">
          There are no houses associated with your account yet.
        </Notification>
      );
    }
    return (
      <div className="house-list-page-wrapper">
        {houses.map((house) => (
          <HouseCard
            house={house}
            key={`house-${house.id}`}
            onEdit={handleEditHouseAddress}
            onRemove={handleRemoveHouseAddress}
          />
        ))}
      </div>
    );
  }, [houses]);

  const renderHeader = useCallback(() => {
    return (
      <>
        <span>Addresses</span>
        {showUpcomingFeatures('ENG-16567') && (
          <Button onClick={onAddHouseAddress} size="small">
            Add address
          </Button>
        )}
      </>
    );
  }, [showUpcomingFeatures]);

  return (
    <AppPage
      className="house-list-page"
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
};

export default AppHouseListPage;
